const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number, default: 0 },
  category: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  description: { type: String, default: '' }
});

module.exports = mongoose.model('Product', productSchema);