import React from "react"
import { Nav } from "./components/Nav"
import { Route } from "react-router"
import { Routes } from "react-router"
import { Home } from "./pages/Home"
import { Footer } from "./components/Footer"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

function App() {
  

  return (
    <>

    <Nav/>

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>

    <Footer/>
      
    </>
  )
}

export default App
