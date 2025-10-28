// src/configs/dbConnect.js
const mongoose = require("mongoose");

const dbConnect = async () => {
  const mongoURI = process.env.MONGO_URI; // ✅ match .env key (not MONGODB_URI)

  if (!mongoURI) {
    console.error("❌ MONGO_URI not set in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
