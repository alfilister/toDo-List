import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../Redux/Actions";

function AddBar() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    task: "",
    priority: "Priority",
  });

  const handleInput = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleBtn = (e) => {
    e.preventDefault();
    dispatch(addTask({ task: input.task, priority: input.priority }));
    setInput({
      task: "",
      priority: "Priority",
    });
  };

  return (
    <div className="addBar">
      <input
        type="text"
        name="task"
        value={input.task}
        placeholder="Type your activities"
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
