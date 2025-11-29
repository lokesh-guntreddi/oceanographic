const express = require("express");
const cors = require("cors");
const { Pinecone } = require("@pinecone-database/pinecone");
require("dotenv").config();
const fishRoutes= require("./routes/fishRoutes.js");
const connectDB = require("./config/db.js");
const app = express();
const mapRoutes = require("./routes/mapRoutes.js");
app.use(cors());
app.use(express.json());




// Connect to MongoDB
connectDB();

// Routes
app.use("/static", express.static("static"));
app.use("/", require("./routes/imageRoutes"));

app.use("/api/fish", fishRoutes);


const kpiRoutes = require("./routes/kpiRoutes.js");

app.use("/api/kpi", kpiRoutes);
// Init Pinecone
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

// Create assistant
const assistant = pc.assistant("oceanassistant");

// Chat route
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await assistant.chat({
      messages: [{ role: "user", content: userMessage }]
    });

    res.json({ response: response.message.content });

  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({
      error: "Assistant failed",
      details: err.message,
    });
  }
});
app.use("/api/map", mapRoutes);
// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
