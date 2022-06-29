import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import logo from "../Miscellaneous/jotaLogo.png"
import { logoutStatus } from "../Redux/Actions"
import ButtonMain from "./Buttons & Inputs/ButtonMain"
import StyleChanger from "./StyleChanger"
import { getAuth, signOut } from "firebase/auth"
import firebaseApp from "../Firebase/credenciales"

const auth = getAuth(firebaseApp)

function NavBar({ dayStyle, setDayStyle }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logginStatus = useSelector((state) => state.loggin)

  const handleLogout = (e) => {
    e.preventDefault
    signOut(auth)
    dispatch(logoutStatus())
    navigate("/")
  }
  return (
    <nav className="navBar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <ButtonMain
        innerText={logginStatus ? "Logout" : "Sign Up"}
        onClick={(e) => handleLogout(e)}
      />

      <StyleChanger dayStyle={dayStyle} setDayStyle={setDayStyle} />
    </nav>
  )
}

export default NavBar
