import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import logo from "../Miscellaneous/jotaLogo.png"
import { logoutStatus } from "../Redux/Actions"
import ButtonMain from "./Buttons & Inputs/ButtonMain"
import StyleChanger from "./StyleChanger"
import { getAuth, signOut } from "firebase/auth"
import firebaseApp from "../Firebase/credenciales"

const auth = getAuth(firebaseApp)

function NavBar({ dayStyle, setDayStyle }) {
  const loc = useLocation()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logginStatus = useSelector((state) => state.loggin)

  const handleLogout = (e) => {
    e.preventDefault
    signOut(auth)
    dispatch(logoutStatus())
    navigate("/")
  }

  const location = loc.pathname === "/home" ? true : false
  console.log(location)

  return (
    <nav className={dayStyle ? "dayBar" : "nightBar"}>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      {location && (
        <>
          <ButtonMain
            className="buttonMain"
            innerText={logginStatus ? "Logout" : "Sign Up"}
            onClick={(e) => handleLogout(e)}
          />

          <StyleChanger dayStyle={dayStyle} setDayStyle={setDayStyle} />
        </>
      )}
    </nav>
  )
}

export default NavBar
