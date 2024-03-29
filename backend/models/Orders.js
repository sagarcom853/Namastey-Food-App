const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, default: 1 },
  price: { type: Number },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [orderItemSchema],
  paymentMode: {
    type: String,
    enum: ['cash', 'card', 'upi'],
    required: true,
  },
  paymentTime: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
    enum: ['Success', 'Pending', 'Failed'],
    default: 'Pending',
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
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;