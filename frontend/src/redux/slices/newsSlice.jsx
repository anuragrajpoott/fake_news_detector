import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  result: null,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setText(state, action) {
      state.text = action.payload;
    },
    setResult(state, action) {
      state.result = action.payload; // e.g. { prediction: "Fake", confidence: 0.88 }
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearResult(state) {
      state.result = null;
      state.error = null;
    },
  },
});

export const { setText, setResult, setError, clearResult } = newsSlice.actions;
export default newsSlice.reducer;
