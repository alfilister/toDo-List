import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, modifyTask } from "../Redux/Actions";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/src/sweetalert2.scss"; // Don't forget to import the styles!
const MySwal = withReactContent(Swal);

function TabList({ task, logginStatus, userRole }) {
  const dispatch = useDispatch();

  const proFeature = (logginStatus, userRole) => {
    if (logginStatus && userRole === "pro") {
      return (
        <i class="fa-solid fa-pen-to-square" onClick={(e) => handleEdit(e)}></i>
      );
    }
  };

  const handleCheck = (e) => {
    task.status === "Active"
      ? (task.status = "Done")
      : (task.status = "Active");

    dispatch(modifyTask(task.id));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    MySwal.fire({
      title: "Task detail",
      icon: "info",
      iconColor: "#fecf3e",

      showCancelButton: true,
      cancelButtonText: "Edit",
      cancelButtonColor: "#fecf3e",
      showConfirmButton: true,
      confirmButtonColor: "#3085d6",

      html:
        `<b>Task name:</b> ${task.task}` +
        `<p><b>Task priority:</b> ${task.priority} </p>` +
        `<p><b>Created at:</b> ${task.created} </p>` +
        `<p><b>Time limit:</b> ${task.limit} </p>` +
        `<p><b>Set alert:</b> ${task.alert} </p>` +
        `<p><b>Details:</b> ${task.details} </p>`,
    });
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
    <div className={userRole === "pro" ? "tabListPro" : "tabList"}>
      <h5>{task.task}</h5>

      <div className="flags">
        {counter.map(() => (
          <i className="fa-solid fa-circle-exclamation" key={++idSetter}></i>
        ))}
      </div>

      <button onClick={(e) => handleCheck(e)}>
        {task.status === "Active" ? "Complete" : "Restore"}
      </button>

      {proFeature(logginStatus, userRole)}

      <i className="fa-solid fa-trash-can" onClick={(e) => handleTrash(e)}></i>
    </div>
  );
}

export default TabList;
