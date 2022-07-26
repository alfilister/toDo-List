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

const validate = (input) => {
  let errors = {}
  if (input.nickname.trim().length < 1) {
    errors.nickname = "Nickname required"
  } else if (!/^.{0,20}$/.test(input.nickname)) {
    errors.nickname = "Max length 20 characters"
  }
  if (input.email.trim().length < 1) {
    errors.email = "Email required"
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.email)
  ) {
    errors.email = "Must be a valid e-mail"
  }
  if (input.password.trim().length < 1) {
    errors.password = "Password required"
  } else if (
    !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,10}$/.test(input.password)
  ) {
    errors.password =
      "Password must contain lowercase, uppercase and a number (length between 6 - 10 characters)"
  }
  if (input.role === "select") {
    errors.role = "role selection required"
  }
  return errors
}

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
      if (errors.nickname || errors.email || errors.password || errors.role) {
        return MySwal.fire({
          title: "Something missing",
          text: "Review the restrictions under each input",
          icon: "warning",
        })
      } else if (
        input.nickname &&
        input.email &&
        input.password &&
        input.role
      ) {
        registerUser(
          input.nickname,
          input.email,
          input.password,
          input.role,
          input.tasks
        )
        signInWithEmailAndPassword(auth, input.email, input.password)
        dispatch(logginStatus())
        return MySwal.fire({
          title: "Account create succesful",
          icon: "success",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
        })
      }
    } else {
      signInWithEmailAndPassword(auth, input.email, input.password)
        .then(() =>
          MySwal.fire({
            title: "Succesful login",
            icon: "success",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
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

    // setInput({
    //   nickname: "",
    //   email: "",
    //   password: "",
    //   role: "select",
    //   tasks: [],
    // })

    //THIS IS JUST ANOTHER WAY TO CAPTURE THE VALUES, BUT PERSONALLY I PREFER WITH THE HANDLEcHANGE

    // setInput({
    // email: e.target.elements.email.value,
    // password: e.target.elements.password.value,
    // role: e.target.elements.role.value,
    // });
  }

  const [errors, setErrors] = useState("")

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    )
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
            {errors.nickname && <p className="errorLogin">{errors.nickname}</p>}
          </>
        )}
        <label>E-mail:</label>
        <InputText
          name="email"
          value={input.email}
          placeholder="example@mail.ex"
          onChange={(e) => handleChange(e)}
        />
        {!signingUp && (
          <>{errors.email && <p className="errorLogin">{errors.email}</p>}</>
        )}

        <label>Password:</label>
        <InputText
          type="password"
          name="password"
          value={input.password}
          onChange={(e) => handleChange(e)}
        />
        {!signingUp && (
          <>
            {errors.password && <p className="errorLogin">{errors.password}</p>}
          </>
        )}
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
            {errors.role && <p className="errorLogin">{errors.role}</p>}
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
