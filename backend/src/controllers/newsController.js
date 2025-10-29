// controllers/newsController.js
import axios from "axios";

export const checkNews = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, message: "No text provided." });
    }

    console.log("Forwarding request to Python ML service...");

    const pythonApiUrl = process.env.PYTHON_API_URL || "http://127.0.0.1:5000/predict";
    const pythonResponse = await axios.post(pythonApiUrl, { text });

    const prediction = pythonResponse.data;
    console.log("Received prediction:", prediction);

    // Optional: save result to MongoDB
    // await NewsCheck.create({ text, ...prediction });

    res.status(200).json({
      success: true,
      data: prediction,
    });
  } catch (error) {
    console.error("Error in checkNews controller:", error.message);

    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({
        success: false,
        message: "Could not connect to the Python ML service. Is it running?",
      });
    }

    res.status(500).json({
      success: false,
      message: "An error occurred while processing the request.",
      error:error.message
    });
  }
};
