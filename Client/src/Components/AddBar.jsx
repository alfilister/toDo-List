import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../Redux/Actions";
import Swal from "sweetalert";

const validate = (input) => {
  let errors = {};
  if (input.task.trim().length < 1) {
    errors.task = "Task needed to add";
  } else if (!/^.{0,50}$/.test(input.task)) {
    errors.task = "Max length 50 characters";
  }
  return errors;
};

function AddBar() {
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

  const handleBtn = (e) => {
    e.preventDefault();
    if (!input.task || input.priority === "Priority" || errors.task) {
      Swal(
        "Missing info",
        "Set an Activity name and a Priority to proceed",
        "warning"
      );
    } else {
      dispatch(addTask({ task: input.task.trim(), priority: input.priority }));
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
