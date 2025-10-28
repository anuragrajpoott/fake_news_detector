import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkNews } from "../services/operations/newsOperation"; // corrected import path

const Home = () => {
  const [newsText, setNewsText] = useState("");
  const { result } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newsText.trim()) {
      alert("Please enter some news text.");
      return;
    }

    try {
      await dispatch(checkNews(newsText));
      setNewsText("");
    } catch (error) {
      console.error("Error checking news:", error);
      alert("Failed to analyze news. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-slate-950 text-white px-4">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-4">
        Detect Fake News Instantly 🧠
      </h1>
      <p className="text-gray-400 text-center max-w-xl mb-8">
        Paste a news headline or paragraph below, and our AI-powered system will tell you whether it’s{" "}
        <span className="text-blue-400 font-semibold">real</span> or{" "}
        <span className="text-red-400 font-semibold">fake</span>.
      </p>

      {/* Input Box */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800"
      >
        <textarea
          className="w-full h-40 p-4 rounded-xl bg-slate-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Paste news text here..."
          value={newsText}
          onChange={(e) => setNewsText(e.target.value)}
        />

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold transition-all"
          >
            Analyze News
          </button>
        </div>
      </form>

      {/* Result Section */}
      {result && (
        <div
          className={`mt-8 mb-8 p-6 rounded-xl w-full max-w-md text-center shadow-lg transition-all ${
            result.prediction?.toLowerCase() === "fake"
              ? "bg-red-500/10 border border-red-500"
              : "bg-green-500/10 border border-green-500"
          }`}
        >
          <h2
            className={`text-2xl font-bold mb-2 ${
              result.prediction?.toLowerCase() === "fake"
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            {result.prediction} News
          </h2>
          {result.confidence !== undefined && (
            <p className="text-gray-400">
              Confidence: {(result.confidence * 100).toFixed(1)}%
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export
default Home;
