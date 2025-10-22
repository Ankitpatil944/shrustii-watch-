const { sequelize } = require('../config/database');
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

const seed = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established');
    
    // Create sample users
    const users = await User.bulkCreate([
      {
        email: 'admin@shrustii.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        isActive: true,
        emailVerified: true
      },
      {
        email: 'customer@example.com',
        password: 'customer123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        role: 'customer',
        isActive: true,
        emailVerified: true
      }
    ]);
    console.log('✅ Sample users created');
    
    // Create sample products
    const products = await Product.bulkCreate([
      {
        name: 'Élégance Noir',
        description: 'A timeless masterpiece that embodies the essence of luxury. Crafted with precision and attention to detail.',
        price: 25000.00,
        originalPrice: 30000.00,
        category: 'classic',
        sku: 'LUM-EN-001',
        stock: 10,
        images: [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
          'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800'
        ],
        specifications: {
          movement: 'Swiss Automatic',
          caseMaterial: 'Stainless Steel',
          dialColor: 'Black',
          strapMaterial: 'Leather',
          waterResistance: '50m',
          caseSize: '42mm'
        },
        features: ['Swiss Movement', 'Sapphire Crystal', 'Date Display', 'Luminous Hands'],
        isActive: true,
        isFeatured: true,
        rating: 4.8,
        reviewCount: 24,
        weight: 120.5,
        dimensions: { width: 42, height: 12, length: 200 },
        warranty: '2 Years International',
        tags: ['luxury', 'classic', 'swiss', 'automatic']
      },
      {
        name: 'Heritage Gold',
        description: 'A tribute to traditional watchmaking with modern sophistication. Limited edition piece.',
        price: 45000.00,
        category: 'heritage',
        sku: 'LUM-HG-002',
        stock: 5,
        images: [
          'https://images.unsplash.com/photo-1542496658-e33a6d0d50c6?w=800',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
        ],
        specifications: {
          movement: 'Swiss Manual Wind',
          caseMaterial: '18K Gold',
          dialColor: 'Champagne',
          strapMaterial: 'Alligator Leather',
          waterResistance: '30m',
          caseSize: '40mm'
        },
        features: ['Manual Wind', 'Gold Case', 'Alligator Strap', 'Limited Edition'],
        isActive: true,
        isFeatured: true,
        isLimited: true,
        rating: 4.9,
        reviewCount: 12,
        weight: 95.2,
        dimensions: { width: 40, height: 10, length: 190 },
        warranty: '3 Years International',
        tags: ['heritage', 'gold', 'limited', 'manual']
      },
      {
        name: 'Bespoke Diamond',
        description: 'Custom crafted luxury timepiece with genuine diamonds. Made to order.',
        price: 125000.00,
        category: 'bespoke',
        sku: 'LUM-BD-003',
        stock: 1,
        images: [
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
          'https://images.unsplash.com/photo-1594534475808-b358fcb88e12?w=800'
        ],
        specifications: {
          movement: 'Swiss Automatic',
          caseMaterial: '18K White Gold',
          dialColor: 'Mother of Pearl',
          strapMaterial: 'Diamond Bracelet',
          waterResistance: '30m',
          caseSize: '38mm'
        },
        features: ['Diamond Setting', 'White Gold', 'Mother of Pearl', 'Bespoke'],
        isActive: true,
        isFeatured: true,
        isLimited: true,
        rating: 5.0,
        reviewCount: 3,
        weight: 85.0,
        dimensions: { width: 38, height: 9, length: 180 },
        warranty: '5 Years International',
        tags: ['bespoke', 'diamond', 'luxury', 'custom']
      },
      {
        name: 'Sport Chronograph',
        description: 'High-performance sports watch with chronograph function. Built for adventure.',
        price: 18000.00,
        category: 'classic',
        sku: 'LUM-SC-004',
        stock: 15,
        images: [
          'https://images.unsplash.com/photo-1523170335258-f5e6a4c4b3c4?w=800',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
        ],
        specifications: {
          movement: 'Swiss Automatic',
          caseMaterial: 'Titanium',
          dialColor: 'Blue',
          strapMaterial: 'Rubber',
          waterResistance: '200m',
          caseSize: '44mm'
        },
        features: ['Chronograph', 'Titanium Case', '200m Water Resistant', 'Sport'],
        isActive: true,
        isFeatured: false,
        rating: 4.6,
        reviewCount: 18,
        weight: 110.0,
        dimensions: { width: 44, height: 14, length: 220 },
        warranty: '2 Years International',
        tags: ['sport', 'chronograph', 'titanium', 'waterproof']
      }
    ]);
    console.log('✅ Sample products created');
    
    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Sample Data Summary:');
    console.log(`👥 Users: ${users.length}`);
    console.log(`⌚ Products: ${products.length}`);
    console.log('\n🔑 Login Credentials:');
    console.log('Admin: admin@shrustii.com / admin123');
    console.log('Customer: customer@example.com / customer123');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();
