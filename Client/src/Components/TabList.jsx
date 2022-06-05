import React from "react";

function TabList({ task }) {
  return (
    <div class="flex flex-row">
      <div>{task.task}</div>
      <div>{task.priority}</div>
      <input type="checkbox" />
    </div>
  );
}

export default TabList;
