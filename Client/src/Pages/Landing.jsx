import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("home")}>Take your notes</button>
    </div>
  );
}

export default Landing;
