// server.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const dbConnect = require("./src/configs/dbConnect");
const newsRoutes = require("./src/routes/newsRoutes");
const userRoutes = require("./src/routes/userRoutes");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
dbConnect();

// Middleware
app.use(cookieParser());
app.use(
  cors({
     origin: [
    "http://localhost:5173",
    "https://fake-news-detector-neon-one.vercel.app"
  ], // you can later restrict this to your frontend URL
    credentials: true,
  })
);
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("✅ Express backend is running successfully!");
});

// Routes
app.use("/api", newsRoutes);       // e.g. /api/check-news
app.use("/api/auth", userRoutes);  // e.g. /api/auth/login, /api/auth/signup

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  console.log(`🧠 Backend ready — ensure Python/Flask server runs on port 5000`);
});
