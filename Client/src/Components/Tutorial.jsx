import React from "react"
import { useNavigate } from "react-router-dom"
import Loggin from "./Loggin"
import ButtonMain from "./Buttons & Inputs/ButtonMain"
import Footer from "../Components/Footer"

function Tutorial() {
  const navigate = useNavigate()

  return (
    <div className="tutorial">
      <div className="loginSpace">
        <Loggin />
      </div>
      <div className="btnGuest">
        <p>
          - Or - <br /> - Try the basics -
        </p>
        <ButtonMain
          className="buttonMain"
          innerText="Continue as a guest"
          onClick={() => navigate("home")}
        />
      </div>
    </div>
  )
}

export default Tutorial
