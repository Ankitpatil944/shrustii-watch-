const express = require('express');
const { body, param, validationResult } = require('express-validator');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', authenticateToken, async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { userId: req.user.userId },
      include: [{
        model: Product,
        as: 'product'
      }]
    });

    const total = cartItems.reduce((sum, item) => {
      return sum + (parseFloat(item.price) * item.quantity);
    }, 0);

    res.json({
      success: true,
      data: {
        items: cartItems,
        total: total.toFixed(2),
        itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
      }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Private
router.post('/add', [
  authenticateToken,
  body('productId').isUUID().withMessage('Valid product ID required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('size').optional().isString(),
  body('strap').optional().isString(),
  body('customization').optional().isObject()
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

    const { productId, quantity, size, strap, customization } = req.body;

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }

    // Check if item already exists in cart
    const existingItem = await Cart.findOne({
      where: {
        userId: req.user.userId,
        productId,
        size: size || null,
        strap: strap || null
      }
    });

    if (existingItem) {
      // Update quantity
      await existingItem.update({
        quantity: existingItem.quantity + quantity
      });
    } else {
      // Create new cart item
      await Cart.create({
        userId: req.user.userId,
        productId,
        quantity,
        size,
        strap,
        customization,
        price: product.price
      });
    }

    res.json({
      success: true,
      message: 'Item added to cart successfully'
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/cart/:id
// @desc    Update cart item quantity
// @access  Private
router.put('/:id', [
  authenticateToken,
  param('id').isUUID(),
  body('quantity').isInt({ min: 1 })
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

    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({
      where: {
        id,
        userId: req.user.userId
      }
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    await cartItem.update({ quantity });

    res.json({
      success: true,
      message: 'Cart item updated successfully'
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/cart/:id
// @desc    Remove item from cart
// @access  Private
router.delete('/:id', [
  authenticateToken,
  param('id').isUUID()
], async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await Cart.findOne({
      where: {
        id,
        userId: req.user.userId
      }
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    await cartItem.destroy();

    res.json({
      success: true,
      message: 'Item removed from cart successfully'
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/cart
// @desc    Clear entire cart
// @access  Private
router.delete('/', authenticateToken, async (req, res) => {
  try {
    await Cart.destroy({
      where: { userId: req.user.userId }
    });

    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
