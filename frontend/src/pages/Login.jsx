import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/operations/authOperation"; // corrected import path

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await dispatch(login(formData, navigate));
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] bg-slate-950 text-white px-4">
      <div className="bg-slate-900 p-10 rounded-2xl shadow-xl w-full max-w-2xl border border-slate-800 mt-8 mb-8">
        <h2 className="text-3xl font-bold text-center mb-8">Welcome Back 👋</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block mb-1 text-gray-400">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-3 rounded-lg bg-slate-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              onChange={handleChange}
              value={formData.username}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 rounded-lg bg-slate-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-all mt-4"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
