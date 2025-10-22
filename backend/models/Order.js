const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'),
    defaultValue: 'pending'
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
    defaultValue: 'pending'
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  tax: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  shipping: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  shippingAddress: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  billingAddress: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: true
  },
  paymentId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  trackingNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estimatedDelivery: {
    type: DataTypes.DATE,
    allowNull: true
  },
  shippedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  deliveredAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'orders'
});

module.exports = Order;
