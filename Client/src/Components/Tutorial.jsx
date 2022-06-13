import React from "react";
import { useNavigate } from "react-router-dom";
import Loggin from "./Loggin";

function Tutorial() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("home")}>Continue as a guest</button>
      <Loggin />
    </div>
  );
}

export default Tutorial;
