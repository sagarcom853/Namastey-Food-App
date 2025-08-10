//for payment
const express = require("express");
const router = express.Router();
const chatController = require("../controllers/Chat");
router.post("/chat", chatController.apiFunction);

module.exports = router;
