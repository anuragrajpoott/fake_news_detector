// models/NewsCheck.js
import mongoose from "mongoose";

const newsCheckSchema = new mongoose.Schema({
  text: { type: String, required: true },
  prediction: { type: String, required: true },
  confidence: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export const NewsCheck = mongoose.model("NewsCheck", newsCheckSchema);
