import { toast } from "react-hot-toast";
import { endPoints } from "../apis";
import  apiConnector  from "../../utils/apiConnector";
import { setUser, setToken } from "../../redux/slices/userSlice"; // match your actual slice name

// ───────────────────────────────
// REGISTER
// ───────────────────────────────
export function signUp(formData, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", endPoints.REGISTER, formData);

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      const { user, token } = response.data;

      dispatch(setUser(user));
      dispatch(setToken(token));

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      toast.success("Signup successful!");
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };
}

// ───────────────────────────────
// LOGIN
// ───────────────────────────────
export function login(formData, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", endPoints.LOGIN, formData);

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      const { user, token } = response.data;

      dispatch(setUser(user));
      dispatch(setToken(token));

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };
}
