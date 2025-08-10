const Product = require('../models/Product');

const getAllProducts = async () => {
  return await Product.find({});
};

module.exports = { getAllProducts };