import { apiConnector } from "../../utils/apiConnector.jsx";
import { endPoints } from "../apis.jsx";
import { setText, setResult } from "../slices/newsSlice.js";


export function checkNews(newsText) {
  return async (dispatch) => {
    try {
      // call backend
      const response = await apiConnector("POST", endPoints.NewsCheck, { text: newsText });

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Unexpected response");
      }

      // store backend result in redux
      dispatch(setResult(response.data.data)); // assuming backend returns { data: { prediction, confidence } }

      toast.success("News analyzed successfully!");
    } catch (error) {
      console.error("News check error:", error);
      toast.error(error?.response?.data?.message || "News check failed");
    }
  };
}
