import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "../src/components/Footer"
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Nav />
      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
