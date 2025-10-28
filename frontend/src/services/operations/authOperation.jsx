import { toast } from "react-hot-toast";
import { endPoints } from "../apiConnector";
import { axiosConnector } from "../apiConnector/axiosConnector";
import {setUser,setToken} from "../../redux/slices/authSlice";

export function signUp(formData, navigate) {
  return async (dispatch) => {
    try {
      const response = await axiosConnector("POST", endPoints.REGISTER, formData);

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error(error?.response?.data?.message || "Signup failed");
    } 
  };
}

export function login(formData, navigate) {
  return async (dispatch) => {
    try {
      const response = await axiosConnector("POST", endPoints.LOGIN, formData);

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/");
    } catch (error) {
      console.error("login failed:", error);
      toast.error(error?.response?.data?.message || "login failed");
    } 
  };
}

