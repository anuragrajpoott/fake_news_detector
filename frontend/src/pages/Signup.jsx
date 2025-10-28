import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, username, email, password, confirmPassword } =
      formData;

    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
      return alert("Please fill all fields");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    console.log("Signup Data:", formData);
    alert("Signup data logged to console!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] bg-slate-950 text-white px-4">
      <div className="bg-slate-900 p-10 rounded-2xl shadow-xl w-full max-w-2xl border border-slate-800 mt-8 mb-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Create an Account ✨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-400">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full p-3 rounded-lg bg-slate-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John"
                onChange={handleChange}
                value={formData.firstName}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-400">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full p-3 rounded-lg bg-slate-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Doe"
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block mb-1 text-gray-400">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-3 rounded-lg bg-slate-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              onChange={handleChange}
              value={formData.username}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 rounded-lg bg-slate-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@email.com"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          {/* Password + Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-400">Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-3 rounded-lg bg-slate-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-400">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full p-3 rounded-lg bg-slate-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Re-enter password"
                onChange={handleChange}
                value={formData.confirmPassword}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-all mt-4"
          >
            Sign Up
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
