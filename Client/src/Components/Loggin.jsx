import React, { useState } from "react"
import firebaseApp from "../Firebase/credenciales"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { logginStatus } from "../Redux/Actions"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ButtonMain from "./Buttons & Inputs/ButtonMain"
import InputText from "./Buttons & Inputs/InputText"

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import "sweetalert2/src/sweetalert2.scss" // Don't forget to import the styles!

const MySwal = withReactContent(Swal)

const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)

function Loggin() {
  // const userRole = useSelector((state) => state.userInfo.role)
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const [signingUp, setSigningUp] = useState(false)
  const [input, setInput] = useState({
    nickname: "",
    email: "",
    password: "",
    role: "select",
    tasks: [],
  })

  const registerUser = async (nickname, email, password, role, tasks) => {
    const infoUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((firebaseUser) => {
      return firebaseUser
    })

    const docuRef = doc(firestore, `/users/${infoUser.user.uid}`)
    setDoc(docuRef, { nickname, email, password, role, tasks })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!signingUp) {
      registerUser(
        input.nickname,
        input.email,
        input.password,
        input.role,
        input.tasks
      )
      signInWithEmailAndPassword(auth, input.email, input.password)
      dispatch(logginStatus())
    } else {
      signInWithEmailAndPassword(auth, input.email, input.password)
        .then(() =>
          MySwal.fire({
            title: "Succesful login",
            icon: "success",
            timerProgressBar: true,
            timer: 1000,
          })
        )
        .catch((err) =>
          MySwal.fire({
            title: "Authentication Failed",
            text: err,
            icon: "error",
          })
        )
      dispatch(logginStatus())
    }

    setInput({
      nickname: "",
      email: "",
      password: "",
      role: "select",
      tasks: [],
    })

    //THIS IS JUST ANOTHER WAY TO CAPTURE THE VALUES, BUT PERSONALLY I PREFER WITH THE HANDLEcHANGE

    // setInput({
    // email: e.target.elements.email.value,
    // password: e.target.elements.password.value,
    // role: e.target.elements.role.value,
    // });
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="loggin">
      <h1 className="actionSuggested">{!signingUp ? "Sign Up" : "Login"}</h1>
      <div className="btnAlternative">
        <ButtonMain
          onClick={() => setSigningUp(!signingUp)}
          className="buttonGeneral"
          innerText={
            signingUp ? "I want to Sign Up" : "I already have an account"
          }
        />
      </div>
      <h3 className="actionSuggested">
        {!signingUp
          ? "If you want to create an account"
          : "If you already have a account"}
      </h3>

      <form className="formTutorial">
        {!signingUp && (
          <>
            <label>nickname:</label>
            <div className="inputSpace">
              <InputText
                name="nickname"
                value={input.nickname}
                placeholder="How do you want us to call you?"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </>
        )}
        <label>E-mail:</label>
        <InputText
          name="email"
          value={input.email}
          placeholder="example@mail.ex"
          onChange={(e) => handleChange(e)}
        />
        <label>Password:</label>
        <InputText
          type="password"
          name="password"
          value={input.password}
          onChange={(e) => handleChange(e)}
        />

        {!signingUp && (
          <>
            <label>Role:</label>
            <select
              // id="role"
              name="role"
              onChange={(e) => handleChange(e)}
              value={input.role}
            >
              <option disabled>select</option>
              <option value="pro">proUser</option>
              <option value="basic">basic</option>
            </select>
          </>
        )}

        <div className="btnConfirmation">
          <ButtonMain
            className="buttonGeneral"
            innerText={!signingUp ? "Sign Up" : "Loggin"}
            onClick={(e) => handleSubmit(e)}
          />
        </div>
      </form>
    </div>
  )
}

export default Loggin
