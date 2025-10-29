import { toast } from "react-hot-toast";
import { apiConnector } from "../../utils/apiConnector";
import { endPoints } from "../apis";
import { setText, setResult } from "../../redux/slices/newsSlice";

// ───────────────────────────────
// CHECK NEWS (Fake News Detection)
// ───────────────────────────────
export function checkNews(formData) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", endPoints.NEWS_CHECK, formData);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Unexpected response from server");
      }

      const result = response.data.data; // e.g. { prediction: "Fake", confidence: 0.92 }

      dispatch(setResult(result));

      toast.success("News analyzed successfully!");
    } catch (error) {
      console.error("News check error:", error);
      toast.error(error?.response?.data?.message || "News check failed");
    }
  };
}
