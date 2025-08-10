const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  card: {
    card: {
      "@type": String,
      header: { type: Object, default: {} },
      layout: { type: Object, default: {} },
      imageGridCards: { type: Object, default: {} },
      id: String,
      gridElements: { type: Object, default: {} }
    }
  }
}, { _id: false });

const DataSchema = new mongoose.Schema({
  statusMessage: String,
  pageOffset: {
    nextOffset: String,
    widgetOffset: { type: Object, default: {} }
  },
  cards: [CardSchema],
  firstOffsetRequest: Boolean,
  cacheExpiryTime: Number,
  nextFetch: Number
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  statusCode: Number,
  data: DataSchema,
  tid: String,
  sid: String,
  deviceId: String,
  csrfToken: String
});

module.exports = mongoose.model('Product', ProductSchema);