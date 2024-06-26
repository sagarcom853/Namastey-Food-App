const express = require('express');
const router = express.Router();
const productController = require("../controllers/Product")

router.get('/products', productController.getAllProducts);
// Add more routes as needed

module.exports = router;
