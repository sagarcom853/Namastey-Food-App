//for payment
const express = require('express');
const router = express.Router();
const paymentController = require("../controllers/Payment")
router.post("/checkout", paymentController.checkout)
router.get("/getKey", paymentController.getKey)
router.post("/paymentVerification", paymentController.paymentVerification)


module.exports = router