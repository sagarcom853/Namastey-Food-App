const express = require('express');
const router = express.Router();
const orderController = require("../controllers/Order")

router.post('/placeOrder', orderController.createOrder)
router.get('/getOrders', orderController.getAllOrders)

module.exports = router