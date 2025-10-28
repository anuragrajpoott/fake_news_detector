import React, {  useState } from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  const [user, setUser] = useState(null);

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold select-none">
          Fake<span className="text-blue-500">News</span> Detector
        </Link>

        {/* Right side */}
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">
              Hello, <span className="font-semibold text-blue-400">{user}</span>
            </span>
            <button
              className="px-4 py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-all"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
