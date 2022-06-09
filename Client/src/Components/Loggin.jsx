import React, { useState } from "react";
import { useSelector } from "react-redux";

function Loggin() {
  const logged = useSelector((state) => state.loggin);

  const [signUp, setSignUp] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "select",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setInput({
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
      <h1>{!signUp ? "Sign Up" : "Loggin"}</h1>
      <button onClick={() => setSignUp(!signUp)}>
        {signUp ? "I want to Sign Up" : "I already have an account"}
      </button>

      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          E-mail:
          <input
            type="email"
            // id="email"
            name="email"
            value={input.email}
            placeholder="example@mail.io"
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

        {!signUp && (
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
        <input type="submit" value={!signUp ? "Sign Up" : "Loggin"} />
      </form>
    </div>
  );
}

export default Loggin;
