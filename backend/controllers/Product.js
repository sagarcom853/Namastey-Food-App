const Product = require("../models/Product")
const {getAllProducts } = require('../service/Product');

const getAllProductsC = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
const getTopRatedProducts = async (req, res)=>{
  try{
    const products = await Product.find()
    res.json(products)
  }catch(error){
    res.status(500).json({message: error.message})

  }
}
  module.exports = {
    getAllProductsC,
  };