// App.js (updated with Gemini integration)
const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const bodyParser = require("body-parser");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Existing Routes
const productRoutes = require("./Routes/ProductRoutes");
const userRoutes = require("./Routes/userRoutes");
const orderRoutes = require("./Routes/OrderRoutes");
const paymentRoutes = require("./Routes/PaymentRoutes");
const swiggyRoutes = require("./Routes/swiigyRoutes");
const chatRoutes = require("./Routes/chatRoute");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cors()); // This is redundant if the above is used, but kept to match your original code
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection
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

// MongoDB Schema and Model for Gemini conversations
const conversationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
const Conversation = mongoose.model("Conversation", conversationSchema);

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// API Route for Gemini chat
app.post("/api/gemini/chat", async (req, res) => {
  const { prompt, userId } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const query = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    systemInstruction: {
      parts: [
        {
          text: "You are a customer service assistant for an Food delivery application. Your primary goal is to help customers with product inquiries, order tracking, and general support. Respond to all queries in a helpful and friendly tone, and always refer to the user as 'the customer'.",
        },
      ],
    },
  };
  try {
    const result = await model.generateContent(query);
    const responseText = result.response.text();

    // Save the conversation to MongoDB
    const newConversation = new Conversation({
      userId: userId || "anonymous",
      prompt,
      response: responseText,
    });
    await newConversation.save();

    res.json({ response: responseText });
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

// Route to get conversation history for a user
app.get("/api/gemini/history/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const history = await Conversation.find({ userId }).sort({ timestamp: 1 });
    res.json({ history });
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Failed to fetch conversation history" });
  }
});

// Existing Routes
app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);
app.use("/payment", paymentRoutes);
app.use("/swiggy", swiggyRoutes);
app.use("/openai", chatRoutes);

const PORT = process.env.PORT || 8000;
// Start the server
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
  console.log(`Server is running on http://localhost:${PORT}`);
});
