const User = require("../models/User");
const Order = require("../models/Orders");

const createOrder = async (req, res) => {
  try {
    const { email, cart } = req.body;
    // Find the existing order for the user
    const existingOrder = await Order.findOne({ email });
    const existingUser = await User.findOne({ email });
    if (existingOrder) {
      // Append new cart details to the existing order
      existingOrder.cart.push(...cart);
      await existingOrder.save();
      res.status(200).json({ message: "Order appended successfully" });
    } else {
      // Create a new order if the user doesn't have an existing order
      const newOrder = new Order({
        email,
        // cartDetails,
      });
      await newOrder.save();
      res.status(201).json({ message: "Order placed successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    // Fetch all users and their orders
    const users = await User.find({});

    // Extract orders from users and add name and add1 to each order
    const orders = [];
    users.forEach((user) => {
      user.orders.forEach((order) => {
        orders.push({
          ...order.toObject(), // Convert Mongoose document to plain object
          name: user.name, // Add user name to the order object
          add1: user.add1,
          email: user.email,
          // Add user add1 to the order object
        });
      });
    });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createOrder, getAllOrders };
