const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { authenticateToken } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// @route   POST /api/payments/create-payment-intent
// @desc    Create Stripe payment intent
// @access  Private
router.post('/create-payment-intent', [
  authenticateToken,
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('currency').isLength({ min: 3, max: 3 }).withMessage('Currency must be 3 characters'),
  body('orderId').isUUID().withMessage('Valid order ID required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { amount, currency = 'usd', orderId, metadata = {} } = req.body;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount is already in cents from frontend
      currency,
      metadata: {
        orderId,
        userId: req.user.userId,
        ...metadata
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      }
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment intent',
      error: error.message
    });
  }
});

// @route   POST /api/payments/confirm-payment
// @desc    Confirm payment and update order
// @access  Private
router.post('/confirm-payment', [
  authenticateToken,
  body('paymentIntentId').notEmpty().withMessage('Payment intent ID required'),
  body('orderId').isUUID().withMessage('Valid order ID required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { paymentIntentId, orderId } = req.body;

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        success: false,
        message: 'Payment not completed'
      });
    }

    // TODO: Update order status in database
    // const order = await Order.findByPk(orderId);
    // await order.update({ 
    //   paymentStatus: 'paid',
    //   status: 'processing',
    //   paymentId: paymentIntentId
    // });

    res.json({
      success: true,
      message: 'Payment confirmed successfully',
      data: {
        paymentIntentId,
        orderId,
        status: paymentIntent.status
      }
    });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to confirm payment',
      error: error.message
    });
  }
});

// @route   POST /api/payments/create-customer
// @desc    Create Stripe customer
// @access  Private
router.post('/create-customer', authenticateToken, async (req, res) => {
  try {
    const { email, name, phone } = req.body;

    const customer = await stripe.customers.create({
      email,
      name,
      phone,
      metadata: {
        userId: req.user.userId
      }
    });

    res.json({
      success: true,
      data: {
        customerId: customer.id
      }
    });
  } catch (error) {
    console.error('Customer creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create customer',
      error: error.message
    });
  }
});

// @route   GET /api/payments/methods
// @desc    Get saved payment methods
// @access  Private
router.get('/methods', authenticateToken, async (req, res) => {
  try {
    // TODO: Get customer ID from user profile
    const customerId = req.body.customerId; // This should come from user profile

    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: 'Customer ID required'
      });
    }

    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    res.json({
      success: true,
      data: {
        paymentMethods: paymentMethods.data
      }
    });
  } catch (error) {
    console.error('Get payment methods error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve payment methods',
      error: error.message
    });
  }
});

// @route   POST /api/payments/webhook
// @desc    Handle Stripe webhooks
// @access  Public
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      // TODO: Update order status in database
      break;
    
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      // TODO: Update order status in database
      break;
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;
