const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
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
    defaultValue: 1,
    validate: {
      min: 1
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
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  }
}, {
  tableName: 'cart_items',
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'product_id', 'size', 'strap']
    }
  ]
});

module.exports = Cart;
