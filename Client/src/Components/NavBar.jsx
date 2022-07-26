import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import logo from "../Miscellaneous/jotaLogo.webp"
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
  const userName = useSelector((state) => state.userInfo.nickname)

  const handleLogout = (e) => {
    e.preventDefault
    signOut(auth)
    dispatch(logoutStatus())
    navigate("/")
  }

  const location = loc.pathname === "/home"

  function dayOrNight() {
    if (loc.pathname === "/") {
      return "dayBar"
    } else if (dayStyle) {
      return "dayBar"
    } else {
      return "nightBar"
    }
  }

  return (
    <nav className={dayOrNight()}>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      {location && (
        <>
          <div className="greetingNav">
            <h3>{userName}</h3>
          </div>
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
