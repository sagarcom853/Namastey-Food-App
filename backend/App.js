const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' })
const bodyParser = require('body-parser');
const productRoutes = require("./Routes/ProductRoutes")
const userRoutes = require("./Routes/userRoutes")
const orderRoutes = require("./Routes/OrderRoutes")
const paymentRoutes = require("./Routes/PaymentRoutes")

const app = express();
const cors = require('cors');
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(express.json())


var mongoURL = `mongodb+srv://sagarcom853:4uFJBxok7c5RAhXS@cluster0.p1cysgz.mongodb.net/namaste-food`
mongoose.connect(mongoURL)
var db = mongoose.connection
db.on('connected', () => {
    console.log('mongoDb connection successfull')
})

db.on('error', () => {
    console.log('mongodb connection failed')
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

app.use('/product', productRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRoutes);
app.use('/payment', paymentRoutes);

const PORT = process.env.PORT || 8000
console.log(process.env.PORT)
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
