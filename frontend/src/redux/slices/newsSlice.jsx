// src/redux/slices/newsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  result: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload; // e.g., { prediction: "Fake", confidence: 0.88 }
    },
  },
});

export const { setText, setResult } = newsSlice.actions;

export default newsSlice.reducer;
