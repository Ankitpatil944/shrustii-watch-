const express = require('express');
const { body, param, validationResult } = require('express-validator');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', [
  authenticateToken,
  body('shippingAddress').isObject().withMessage('Shipping address required'),
  body('billingAddress').isObject().withMessage('Billing address required'),
  body('paymentMethod').isString().withMessage('Payment method required'),
  body('notes').optional().isString()
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

    const { shippingAddress, billingAddress, paymentMethod, notes } = req.body;

    // Get user's cart items
    const cartItems = await Cart.findAll({
      where: { userId: req.user.userId },
      include: [Product]
    });

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + (parseFloat(item.price) * item.quantity);
    }, 0);

    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 1000 ? 0 : 50; // Free shipping over $1000
    const total = subtotal + tax + shipping;

    // Generate order number
    const orderNumber = `LUM-${Date.now().toString().slice(-6)}`;

    // Create order
    const order = await Order.create({
      orderNumber,
      userId: req.user.userId,
      subtotal,
      tax,
      shipping,
      total,
      shippingAddress,
      billingAddress,
      paymentMethod,
      notes
    });

    // Create order items
    for (const cartItem of cartItems) {
      await OrderItem.create({
        orderId: order.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        price: cartItem.price,
        size: cartItem.size,
        strap: cartItem.strap,
        customization: cartItem.customization,
        productSnapshot: {
          name: cartItem.product.name,
          image: cartItem.product.images[0],
          sku: cartItem.product.sku
        }
      });

      // Update product stock
      await cartItem.product.update({
        stock: cartItem.product.stock - cartItem.quantity
      });
    }

    // Clear cart
    await Cart.destroy({
      where: { userId: req.user.userId }
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        order: order.toJSON(),
        orderNumber: order.orderNumber
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.userId },
      order: [['createdAt', 'DESC']],
      include: [{
        model: OrderItem,
        as: 'items',
        include: [Product]
      }]
    });

    res.json({
      success: true,
      data: {
        orders
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', [
  authenticateToken,
  param('id').isUUID()
], async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: {
        id,
        userId: req.user.userId
      },
      include: [{
        model: OrderItem,
        as: 'items',
        include: [Product]
      }]
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: {
        order
      }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
