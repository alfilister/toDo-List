import React, { useState } from "react";
import firebaseApp from "../Firebase/credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function Loggin() {
  const [signingUp, setSigningUp] = useState(false);
  const [input, setInput] = useState({
    nickname: "",
    email: "",
    password: "",
    role: "select",
  });

  const registerUser = async (nickname, email, password, role) => {
    const infoUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((firebaseUser) => {
      return firebaseUser;
    });

    const docuRef = doc(firestore, `/users/${infoUser.user.uid}`);
    setDoc(docuRef, { nickname, email, password, role });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!signingUp) {
      registerUser(input.nickname, input.email, input.password, input.role);
      signInWithEmailAndPassword(auth, input.email, input.password);
    } else {
      signInWithEmailAndPassword(auth, input.email, input.password);
    }

    setInput({
      nickname: "",
      email: "",
      password: "",
      role: "select",
    });

    //THIS IS JUST ANOTHER WAY TO CAPTURE THE VALUES, BUT PERSONALLY I PREFER WITH THE HANDLEcHANGE

    // setInput({
    // email: e.target.elements.email.value,
    // password: e.target.elements.password.value,
    // role: e.target.elements.role.value,
    // });
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>{!signingUp ? "Sign Up" : "Loggin"}</h1>
      <button onClick={() => setSigningUp(!signingUp)}>
        {signingUp ? "I want to Sign Up" : "I already have an account"}
      </button>
      <form onSubmit={(e) => handleSubmit(e)}>
        {!signingUp && (
          <label>
            nickname:
            <input
              type="text"
              // id="nickname"
              name="nickname"
              value={input.nickname}
              placeholder="How do you want us to call you?"
              onChange={(e) => handleChange(e)}
            />
          </label>
        )}
        <label>
          E-mail:
          <input
            type="email"
            // id="email"
            name="email"
            value={input.email}
            placeholder="example@mail.ex"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            // id="password"
            name="password"
            value={input.password}
            onChange={(e) => handleChange(e)}
          />
        </label>

        {!signingUp && (
          <label>
            Role:
            <select
              // id="role"
              name="role"
              onChange={(e) => handleChange(e)}
              value={input.role}
            >
              <option disabled>select</option>
              <option value="pro">proUser</option>
              <option value="guest">guest</option>
            </select>
          </label>
        )}
        <input type="submit" value={!signingUp ? "Sign Up" : "Loggin"} />
      </form>
    </div>
  );
}

export default Loggin;
