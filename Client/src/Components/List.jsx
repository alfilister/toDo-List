import React from "react";
import TabList from "./TabList";

function List({ tasks, setTasks, filter, sort }) {
  const preShow =
    filter === "All" ? tasks : tasks.filter((el) => el.status === filter);

  const toShow =
    (sort === "Sort" && preShow) ||
    (sort === "Asc" &&
      preShow.sort((a, b) => {
        if (a.priority > b.priority) {
          return 1;
        }
        if (b.priority > a.priority) {
          return -1;
        }
        if (a.task > b.task) {
          return 1;
        }
        if (b.task > a.task) {
          return -1;
        }
        return 0;
      })) ||
    (sort === "Des" &&
      preShow.sort((a, b) => {
        if (a.priority > b.priority) {
          return -1;
        }
        if (b.priority > a.priority) {
          return 1;
        }
        return 0;
      }));

  return (
    <div>
      <header>
        <h6>Activities</h6>
        <h6>Priority</h6>
      </header>
      <div>
        {toShow.map((el) => (
          <TabList task={el} key={el.id} />
        ))}
      </div>
      <div>
        <div>
          {!toShow.length
            ? "Empty list"
            : toShow.length === 1
            ? `${toShow.length} task listed`
            : `${toShow.length} tasks listed`}
        </div>
      </div>
    </div>
  );
}

export default List;
