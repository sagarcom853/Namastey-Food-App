const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const { createOrder } = require("./User");
dotenv.config({ path: "./config/config.env" });
const User = require("../models/User");
var crypto = require("crypto");

var Payment = require("../models/Payment")``;

//creating a razorpay instance
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const checkout = async (req, res) => {
  try {
    const { email, cart, paymentMode, totalAmount, totalAmountwithCharges } =
      req.body;

    // Find the existing user
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new order
    const newOrder = {
      items: cart,
      paymentMode,
      paymentTime: new Date(),
      paymentStatus: "pending",
      amount: Number(totalAmount),
      DeliveryStatus: "Not Delivered",
      DeliveredAt: "",
      totalAmountwithCharges: Number(totalAmountwithCharges),
    };

    existingUser.orders.push(newOrder);
    await existingUser.save();
    const newOrderId = existingUser.orders[existingUser.orders.length - 1]._id;
    const payment_capture = 1;
    // Use Razorpay API to create an order
    try {
      const razorpayOrder = await instance.orders.create({
        amount: Math.ceil(totalAmountwithCharges * 100),
        currency: "INR",
        payment_capture,
        // receipt: newOrderId.toString()
        receipt: "FRGERHHFAEGERBEEVEE",
      });

      console.log("razorpay order", razorpayOrder);
      res.status(200).json({
        message: "Order placed successfully",
        orderId: newOrderId.toString(),
        razorpayOrder,
        user: existingUser,
        id: razorpayOrder.id && razorpayOrder.id,
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const paymentVerification = async (req, res) => {
//     console.log('payment here')
//     console.log(req.body, res)
//     let { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
//     let body = razorpay_order_id + '|' + razorpay_payment_id
//     var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET).update(body.toString()).digest('hex')
//     console.log('sig received', razorpay_signature)
//     console.log('sis generated', expectedSignature)
//     // var response = {"signatureIsValid": "false"}
//     // if(expectedSignature === razorpay_signature){
//     //     response = {"signatureIsValid": "true"}
//     //     res.send(response)
//     // }

//     res.status(200).json({
//         success: true
//     })
// }

const paymentVerification = async (req, res) => {
  console.log(req, req.body);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  //pay_NanHa2sMHWB6PU
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    // res.redirect(
    //     `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    // );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

const getKey = async (req, res) => {
  try {
    const razorpayApiKey = process.env.RAZORPAY_API_KEY;
    if (!razorpayApiKey) {
      return res
        .status(500)
        .json({ error: "Razorpay API key not configured." });
    }

    res.status(200).json({ key: razorpayApiKey });
  } catch (error) {
    console.error("Error in getKey:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { checkout, paymentVerification, getKey };
