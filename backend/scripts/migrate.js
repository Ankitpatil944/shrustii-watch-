const { sequelize } = require('../config/database');
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

// Import Sequelize operators
const { Op } = require('sequelize');

const migrate = async () => {
  try {
    console.log('🔄 Starting database migration...');
    
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established');
    
    // Sync all models
    await sequelize.sync({ force: true });
    console.log('✅ Database tables created');
    
    // Create associations
    User.hasMany(Cart, { foreignKey: 'userId', as: 'cartItems' });
    User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
    
    Product.hasMany(Cart, { foreignKey: 'productId', as: 'cartItems' });
    Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });
    
    Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
    Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    
    Cart.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    Cart.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
    
    OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
    OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
    
    console.log('✅ Model associations created');
    console.log('🎉 Database migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrate();
