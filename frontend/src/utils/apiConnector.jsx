import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fake-news-detector-b.onrender.com/api", // use http unless you have SSL configured
  withCredentials: true,
});

// ───────────────────────────────
// Generic API Connector Function
// ───────────────────────────────
export const apiConnector = async (method, url, data = {}, headers = {}, params = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      headers,
      params,
    });
    return response;
  } catch (error) {
    console.error("API Connector Error:", error);
    throw error; // rethrow to handle in services
  }
};

export default apiConnector;
