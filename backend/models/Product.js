const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  cloudinaryImageId: { type: String, required: true },
  description: { type: String, required: true },
  locality: { type: String, required: true },
  areaName: { type: String, required: true },
  costForTwo: { type: String, required: true },
  cuisines: { type: Array, required: true },
  avgRating: { type: Number, required: true },
  feeDetails: { type: Object },
  price: { type: Number, required: true },

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
