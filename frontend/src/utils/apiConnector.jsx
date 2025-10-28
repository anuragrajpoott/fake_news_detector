import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:8080/api",
  withCredentials: true,
});

export const axiosConnector = (method, url, data, headers, params) => {
  return axiosInstance({
    method,
    url,
    data: data || undefined,
    headers: headers || undefined,
    params: params || undefined,
  });
};