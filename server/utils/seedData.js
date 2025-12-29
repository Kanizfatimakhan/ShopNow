const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');
const connectDB = require('../config/db');

dotenv.config();

const products = [
  {
    name: "Wireless Headphones",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    category: "Electronics",
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
    rating: 4.5,
    inStock: true,
    stock: 50,
  },
  {
    name: "Smart Watch",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    category: "Electronics",
    description: "Feature-rich smartwatch with health tracking, GPS, and waterproof design.",
    rating: 4.7,
    inStock: true,
    stock: 30,
  },
  {
    name: "Leather Backpack",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    category: "Fashion",
    description: "Stylish leather backpack with multiple compartments and laptop sleeve.",
    rating: 4.6,
    inStock: true,
    stock: 40,
  },
  {
    name: "Running Shoes",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    category: "Fashion",
    description: "Comfortable running shoes with advanced cushioning and breathable mesh.",
    rating: 4.8,
    inStock: true,
    stock: 60,
  },
  {
    name: "Sunglasses",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop",
    category: "Fashion",
    description: "UV-protected sunglasses with polarized lenses and lightweight frame.",
    rating: 4.4,
    inStock: true,
    stock: 45,
  },
  {
    name: "Laptop Stand",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    category: "Electronics",
    description: "Ergonomic aluminum laptop stand with adjustable height and ventilation.",
    rating: 4.5,
    inStock: true,
    stock: 35,
  },
  {
    name: "Coffee Maker",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1517668808823-d9fd6c194571?w=500&h=500&fit=crop",
    category: "Home",
    description: "Programmable coffee maker with thermal carafe and auto-shutoff feature.",
    rating: 4.6,
    inStock: true,
    stock: 25,
  },
  {
    name: "Yoga Mat",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
    category: "Sports",
    description: "Non-slip yoga mat with extra cushioning and carrying strap included.",
    rating: 4.7,
    inStock: true,
    stock: 55,
  },
  {
    name: "Wireless Mouse",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
    category: "Electronics",
    description: "Ergonomic wireless mouse with long battery life and precise tracking.",
    rating: 4.5,
    inStock: true,
    stock: 70,
  },
  {
    name: "Water Bottle",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
    category: "Sports",
    description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours.",
    rating: 4.8,
    inStock: true,
    stock: 80,
  },
  {
    name: "Desk Lamp",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
    category: "Home",
    description: "LED desk lamp with adjustable brightness and color temperature.",
    rating: 4.6,
    inStock: true,
    stock: 30,
  },
  {
    name: "Bluetooth Speaker",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    category: "Electronics",
    description: "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
    rating: 4.7,
    inStock: true,
    stock: 40,
  },
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data (optional - remove if you want to keep existing data)
    await Product.deleteMany({});
    console.log('Products cleared');

    // Insert products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    // Create admin user (optional - only if doesn't exist)
    const adminEmail = 'admin@shopnow.com';
    const adminExists = await User.findOne({ email: adminEmail });
    
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Admin user created (email: admin@shopnow.com, password: admin123)');
    } else {
      console.log('Admin user already exists');
    }

    // Create demo user (optional - only if doesn't exist)
    const userEmail = 'user@shopnow.com';
    const userExists = await User.findOne({ email: userEmail });
    
    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('user123', salt);
      
      await User.create({
        name: 'Demo User',
        email: userEmail,
        password: hashedPassword,
        role: 'customer',
      });
      console.log('Demo user created (email: user@shopnow.com, password: user123)');
    } else {
      console.log('Demo user already exists');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

