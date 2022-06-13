import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DailyTasks() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);

  return (
    <>
      {userInfo && (
        <div>
          <button onClick={() => navigate("/home")}>View your tasks</button>
          <h2>Hi {userInfo.nickname.toUpperCase()}</h2>
        </div>
      )}
    </>
  );
}

export default DailyTasks;
