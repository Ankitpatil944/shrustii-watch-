const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'orders',
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true
  },
  strap: {
    type: DataTypes.STRING,
    allowNull: true
  },
  customization: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  },
  productSnapshot: {
    type: DataTypes.JSONB,
    allowNull: false
  }
}, {
  tableName: 'order_items'
});

module.exports = OrderItem;
