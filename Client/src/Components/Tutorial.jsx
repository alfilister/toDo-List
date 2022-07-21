import React from "react"
import { useNavigate } from "react-router-dom"
import Loggin from "./Loggin"
import ButtonMain from "./Buttons & Inputs/ButtonMain"

import guestView from "../Miscellaneous/guestView.png"
import editDetails from "../Miscellaneous/editDetails.png"
import viewDetails from "../Miscellaneous/viewDetails.png"
import navView from "../Miscellaneous/navBar.png"
import nightBar from "../Miscellaneous/nightBar.png"

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
          <div className="sectionTut">
            <h2>What could you do here?</h2>
            <p>
              Every user, no matter loggin status or user subscription could see
              an option button and a style changer
            </p>
            <img src={navView} alt="" />
            <div className="space"></div>
            <img src={nightBar} alt="" />
          </div>
          <div className="sectionTut">
            <h2>As a guest</h2>
            <p>
              As a guest you can save and manage your tasks by status, also you
              can filter and get access to your task by local storage "only in
              your device"
            </p>
            <img className="img" src={guestView} alt="guest view" />
          </div>
          <div className="sectionTut">
            <h2>As a basic user</h2>
            <p>
              With all benefits of a guest account you could also loggin in any
              device you want and manage your tasks
            </p>
            <img className="img" src={nightMode} alt="" />
          </div>
          <div className="sectionTut">
            <h2>As a pro user</h2>
            <p>
              With all benefits of a basic user, you have access to tasks
              details
            </p>
            <img className="img" src={proView} alt="" />
            <p>As a pro user you could send your tasks to an email</p>
            <img className="img" src={emailReceive} alt="" />
            <p>
              By clicking in the detail icon, you could see the preset details,
              and of course once opened, you could edit every feature of the
              task
            </p>
            <img className="img" src={viewDetails} alt="" />
            <div className="space"></div>
            <img className="img" src={editDetails} alt="" />
            <p>
              Feel free to use this lovely app in any mode that fit your needs
            </p>
          </div>
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
