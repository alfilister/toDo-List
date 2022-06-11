import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, modifyTask } from "../Redux/Actions";

function TabList({ task }) {
  const dispatch = useDispatch();

  const handleCheck = (e) => {
    task.status === "Active"
      ? (task.status = "Done")
      : (task.status = "Active");

    dispatch(modifyTask(task.id));
  };

  const handleTrash = (e) => {
    e.preventDefault();
    dispatch(deleteTask(task.id));
  };

  var counter = [];

  for (let index = 0; index < Number(task.priority); index++) {
    counter.push("flag");
  }

  var idSetter = 0;

  return (
    <div className="tabList">
      <h5>{task.task}</h5>

      <div className="flags">
        {counter.map(() => (
          <i className="fa-solid fa-circle-exclamation" key={++idSetter}></i>
        ))}
      </div>

      <button onClick={(e) => handleCheck(e)} type="checkbox">
        {task.status === "Active" ? "Complete" : "Restore"}
      </button>
      <i className="fa-solid fa-trash-can" onClick={(e) => handleTrash(e)}></i>
    </div>
  );
}

export default TabList;
