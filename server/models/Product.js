const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: 0,
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Electronics', 'Fashion', 'Home', 'Sports'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);

