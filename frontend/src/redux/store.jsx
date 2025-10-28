import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import newsReducer from "./slices/newsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    news: newsReducer,
  },
});

export default store;
