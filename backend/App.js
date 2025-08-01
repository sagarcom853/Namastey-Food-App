const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const bodyParser = require("body-parser");
const productRoutes = require("./Routes/ProductRoutes");
const userRoutes = require("./Routes/userRoutes");
const orderRoutes = require("./Routes/OrderRoutes");
const paymentRoutes = require("./Routes/PaymentRoutes");
const swiggyRoutes = require("./Routes/swiigyRoutes");

const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

var mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL);
var db = mongoose.connection;
db.on("connected", () => {
  console.log("mongoDb connection successfull");
});

db.on("error", () => {
  console.log("mongodb connection failed");
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);
app.use("/payment", paymentRoutes);
app.use("/swiggy", swiggyRoutes);

const PORT = process.env.PORT || 8000;
// Start the server
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
  console.log(`Server is running on http://localhost:${PORT}`);
});
