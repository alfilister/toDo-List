import React from "react";
import { useSelector } from "react-redux";

function DailyTasks() {
  const userInfo = useSelector((state) => state.userInfo);

  return (
    <>
      {userInfo && (
        <div>
          <h2>Hi {userInfo.nickname.toUpperCase()}</h2>
        </div>
      )}
    </>
  );
}

export default DailyTasks;
