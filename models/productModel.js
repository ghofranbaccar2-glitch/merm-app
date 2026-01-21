const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  //Add user reference
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},
  { timestamps: true }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;