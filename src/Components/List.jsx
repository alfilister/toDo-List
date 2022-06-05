import React from "react";
import TabList from "./TabList";

function List() {
  const tasks = [
    { task: "do my bed", priority: 5, status: "active" },
    { task: "clean my home", priority: 4, status: "active" },
    { task: "brush my theet", priority: 10, status: "active" },
  ];

  return (
    <div>
      <header>
        <h6>Activities</h6>
        <h6>Priority</h6>
      </header>
      <div>
        {tasks.map((el) => (
          <TabList task={el} />
        ))}
      </div>
      <div>
        <div>
          {!tasks.length
            ? "Empty list"
            : tasks.length === 1
            ? `${tasks.length} task listed`
            : `${tasks.length} tasks listed`}
        </div>
      </div>
    </div>
  );
}

export default List;
