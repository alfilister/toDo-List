import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DailyTasks from "../Components/DailyTasks";
import Tutorial from "../Components/Tutorial";

import firebaseApp from "../Firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logginStatus } from "../Redux/Actions";
const auth = getAuth(firebaseApp);

function Landing() {
  const logged = useSelector((state) => state.loggin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      dispatch(logginStatus(firebaseUser));
    }
  });

  return (
    <div>
      <button onClick={() => navigate("home")}>Take your notes</button>
      {logged ? <DailyTasks /> : <Tutorial />}
    </div>
  );
}

export default Landing;
