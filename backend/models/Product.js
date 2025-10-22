const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 200]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  originalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    validate: {
      min: 0
    }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['classic', 'heritage', 'limited', 'bespoke']]
    }
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Lumière'
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  images: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: []
  },
  specifications: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  },
  features: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: []
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isLimited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: true,
    validate: {
      min: 0,
      max: 5
    }
  },
  reviewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  weight: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true
  },
  dimensions: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  },
  warranty: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tags: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: []
  }
}, {
  tableName: 'products'
});

module.exports = Product;
