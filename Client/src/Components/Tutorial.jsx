import React from "react"
import { useNavigate } from "react-router-dom"
import Loggin from "./Loggin"
import ButtonMain from "./Buttons & Inputs/ButtonMain"

import guestView from "../Miscellaneous/guestView.png"
import editDetails from "../Miscellaneous/editDetails.png"
import viewDetails from "../Miscellaneous/viewDetails.png"
import navView from "../Miscellaneous/navBar.png"
import nightMode from "../Miscellaneous/nightMode.png"
import proView from "../Miscellaneous/proView.png"
import emailReceive from "../Miscellaneous/emailReceived.png"

function Tutorial() {
  const navigate = useNavigate()

  return (
    <div className="tutorial">
      <div className="mainGrid">
        <div className="loginSpace">
          <Loggin />
        </div>
        <div className="tutorialText">
          <h2>what could you do here?</h2>
          <img src={navView} alt="" />
          <h2>As a guest</h2>
          <img src={guestView} alt="guest view" />
          <h2>what a basic user</h2>
          <img src={nightMode} alt="" />
          <h2>what a pro user</h2>
          <img src={proView} alt="" />
          <img src={emailReceive} alt="" />
          <img src={viewDetails} alt="" />
          <img src={editDetails} alt="" />
        </div>
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
