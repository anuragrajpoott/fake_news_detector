import React from "react"
import { Nav } from "./components/Nav"
import { Route } from "react-router"
import { Routes } from "react-router"
import { Home } from "./pages/Home"
import { Footer } from "./components/Footer"

function App() {
  

  return (
    <>

    <Nav/>

    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>

    <Footer/>
      
    </>
  )
}

export default App
