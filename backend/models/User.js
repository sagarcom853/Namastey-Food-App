const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String },
  dob: { type: Date },
  add1: { type: String },
  add2: { type: String },
  landmark: { type: String },
  pin: { type: Number },
  state: { type: String },
  country: { type: String },
  imageURL: { type: String },
  addresses: [{}],
  isAdmin: { type: Boolean },
  orders: [
    {
      items: [
        {
          // Your existing cart schema
        }
      ],
      paymentMode: {
        type: String,
        enum: ['cash', 'card', 'upi'],
      },
      paymentTime: {
        type: Date,
        default: Date.now(),
      },
      paymentStatus: {
        type: String,
        enum: ['success', 'pending', 'failed'],
        default: 'pending',
      },
      DeliveryStatus: {
        type: String,
        enum: ['Not Delivered', 'Out For Delivery', 'Delivered'],
        default: 'Not Delivered',
      },
      DeliveryAt: {
        type: Date,
        default: Date.now(),
      },
      totalAmount: { type: Number },
      totalAmountwithCharges: { type: Number },
    }
  ],
  favourites: {
    restaurant: [{}],
    items: [{}]
  },
  tempCart: {
    cartItems: [{}],
    paymentStatus: {
      type: String, default: 'Pending'
    }

  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
