import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DailyTasks from "../Components/DailyTasks";
import Tutorial from "../Components/Tutorial";

import firebaseApp from "../Firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { logginStatus, logoutStatus, setUserInfo } from "../Redux/Actions";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function Landing() {
  const logged = useSelector((state) => state.loggin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAditionalinfo = async (uid) => {
    const docuRef = doc(firestore, `/users/${uid}`);
    const docu = await getDoc(docuRef);
    const response = docu.data();
    return response;
  };

  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      getAditionalinfo(firebaseUser.uid).then((info) => {
        dispatch(
          setUserInfo({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            nickname: info.nickname,
            role: info.role,
            tasks: info.tasks,
          })
        );
      });

      dispatch(logginStatus());
    } else {
      dispatch(logoutStatus());
    }
  });

  return <div>{logged ? <DailyTasks /> : <Tutorial />}</div>;
}

export default Landing;
