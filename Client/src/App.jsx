import "./_app.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Landing from "./Pages/Landing"
import NavBar from "./Components/NavBar"
import Footer from "./Components/Footer"
import { useState } from "react"

function App() {
  const [dayStyle, setDayStyle] = useState(true)

  return (
    <BrowserRouter>
      <NavBar dayStyle={dayStyle} setDayStyle={setDayStyle} />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home dayStyle={dayStyle} />} />
      </Routes>
      <Footer dayStyle={dayStyle} />
    </BrowserRouter>
  )
}

export default App
