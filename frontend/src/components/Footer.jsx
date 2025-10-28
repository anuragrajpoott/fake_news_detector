import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 py-6 ">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-3 md:space-y-0">
        {/* Logo / Name */}
        <h2 className="text-xl font-semibold">
          Fake<span className="text-blue-500">News</span> Detector
        </h2>

        {/* Copyright */}
        <p className="text-sm">
          © {new Date().getFullYear()} FakeNews Detector — All Rights Reserved.
        </p>

        {/* Socials or Links (optional placeholder) */}
        <div className="flex space-x-4 text-gray-400">
          <a href="#" className="hover:text-blue-400 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};
