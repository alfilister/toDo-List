import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import Loggin from "./Loggin"
import ButtonMain from "./Buttons & Inputs/ButtonMain"

import guestView from "../Miscellaneous/guestView.webp"
import editDetails from "../Miscellaneous/editDetails.webp"
import viewDetails from "../Miscellaneous/viewDetails.webp"
import navView from "../Miscellaneous/navBar.webp"
import nightBar from "../Miscellaneous/nightBar.webp"

import nightMode from "../Miscellaneous/nightMode.webp"
import proView from "../Miscellaneous/proView.webp"
import emailReceive from "../Miscellaneous/emailReceived.webp"

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import "sweetalert2/src/sweetalert2.scss" // Don't forget to import the styles!

const MySwal = withReactContent(Swal)

import firebaseApp from "../Firebase/credenciales"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { logginStatus } from "../Redux/Actions"

const auth = getAuth(firebaseApp)

function Tutorial() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showTutorial, setShowTutorial] = useState(false)

  const handleShow = (e) => {
    e.preventDefault()
    setShowTutorial(!showTutorial)
  }

  const handleGo = (e, mail, password) => {
    e.preventDefault()
    MySwal.fire({
      title: "Succesful login",
      icon: "success",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 2000,
    })
    signInWithEmailAndPassword(auth, mail, password)
    dispatch(logginStatus())
  }

  function tutorialContent() {
    return (
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
            With all benefits of a basic user, you have access to tasks details
          </p>
          <img className="img" src={proView} alt="" />
          <p>As a pro user you could send your tasks to an email</p>
          <img className="img" src={emailReceive} alt="" />
          <p>
            By clicking in the detail icon, you could see the preset details,
            and of course once opened, you could edit every feature of the task
          </p>
          <img className="img" src={viewDetails} alt="" />
          <div className="space"></div>
          <img className="img" src={editDetails} alt="" />
          <p>
            Feel free to use this lovely app in any mode that fit your needs
          </p>
        </div>
      </div>
    )
  }

  function presetsContent() {
    return (
      <div className="btnGuest">
        <h3 className="presetUsers">
          Click the fast-track buttons to experience the guest, basic and pro
          features
        </h3>
        <div className="containerPresets">
          <div className="guestUser">
            <p>- Storage tasks in local memory</p>
            <p>- Manage tasks status</p>
            <p>- Filter tasks by status</p>
            <p>- Order tasks by priority</p>
            <ButtonMain
              className="buttonMain"
              innerText="Go Guest"
              onClick={() => navigate("home")}
            />
          </div>
          <div className="basicUser">
            <p>- Guest features</p>
            <p>- Storage tasks in cloud database</p>
            <p>- Access with email and password</p>
            <ButtonMain
              className="buttonMain"
              innerText="Go Basic"
              onClick={(e) => handleGo(e, "basicuser@mail.com", "basicuser")}
            />
          </div>
          <div className="proUser">
            <p>- Basic features </p>
            <p>- View and edit task aditional features</p>
            <p> - Time limit</p>
            <p> - Detail notes</p>
            <p> - Alert beta</p>
            <p>- Send tasks to an e-mail</p>
            <ButtonMain
              className="buttonMain"
              innerText="Go Pro"
              onClick={(e) => handleGo(e, "prouser@mail.com", "prouser")}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="tutorial">
      <div className="mainGrid">
        <div className="loginSpace">
          <Loggin />
        </div>
        <ButtonMain
          className="buttonGeneral"
          innerText={showTutorial ? "Hide Tutorial" : "Show Tutorial"}
          onClick={(e) => handleShow(e)}
        />
        {showTutorial && tutorialContent()}
      </div>

      {presetsContent()}
    </div>
  )
}

export default Tutorial
