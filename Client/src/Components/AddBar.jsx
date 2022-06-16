import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import firebaseApp from "../Firebase/credenciales";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import { addTask } from "../Redux/Actions";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/src/sweetalert2.scss"; // Don't forget to import the styles!
const MySwal = withReactContent(Swal);

const validate = (input) => {
  let errors = {};
  if (input.task.trim().length < 1) {
    errors.task = "Task needed to add";
  } else if (!/^.{0,50}$/.test(input.task)) {
    errors.task = "Max length 50 characters";
  }
  return errors;
};

const date = new Date();
const dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  .toISOString()
  .slice(0, 10);

function AddBar() {
  const uid = useSelector((state) => state.userInfo.uid);
  const tasksFirestore = useSelector((state) => state.userInfo.tasks);
  const userRole = useSelector((state) => state.userInfo.role);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    task: "",
    priority: "Priority",
  });

  const [errors, setErrors] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const firestore = getFirestore(firebaseApp);

  const handleBtn = (e) => {
    e.preventDefault();
    if (!input.task || input.priority === "Priority" || errors.task) {
      MySwal.fire(
        "Missing info",
        "Set an Activity name and a Priority level to proceed",
        "warning"
      );
    } else {
      const taskCounter = tasksFirestore.length + 1;
      const taskToSend = {
        id: taskCounter,
        task: input.task.trim(),
        priority: input.priority,
        createdAt: dateString,
        timeLimit: "not defined",
        setAlert: false,
        details: "...",
      };
      dispatch(addTask(taskToSend));

      tasksFirestore && tasksFirestore.push(taskToSend);

      const docuRef = doc(firestore, `/users/${uid}`);
      setDoc(
        docuRef,
        {
          tasks: tasksFirestore ? tasksFirestore : [taskToSend],
        },
        { merge: true }
      );

      setInput({
        task: "",
        priority: "Priority",
      });
    }
  };

  return (
    <div className="addBar">
      <input
        type="text"
        name="task"
        value={input.task}
        placeholder="Type your activities - Max 50 char"
        onChange={(e) => handleInput(e)}
      />

      <select
        name="priority"
        value={input.priority}
        onChange={(e) => handleInput(e)}
      >
        <option disabled>Priority</option>
        <option value="5">High</option>
        <option value="3">Medium</option>
        <option value="1">Low</option>
      </select>

      <button onClick={(e) => handleBtn(e)}>Add</button>
    </div>
  );
}

export default AddBar;
