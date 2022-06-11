import React from "react";
import TabList from "./TabList";

function List({ tasks, filter, sort, setSort }) {
  const preShow =
    filter === "All" ? tasks : tasks.filter((el) => el.status === filter);

  const toShow =
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

  const handleSortPriority = (e) => {
    e.preventDefault();
    if (sort === "Asc") {
      setSort("Des");
    } else {
      setSort("Asc");
    }
  };

  return (
    <div className="list">
      <header>
        <h6>Activities</h6>

        <div className="priority">
          <h6>Priority</h6>
          <i
            className="fa-solid fa-arrows-up-down"
            onClick={(e) => handleSortPriority(e)}
          ></i>
        </div>
        <h6>Status</h6>
        <h6>Delete</h6>
      </header>
      <div className="tabsTasks">
        {toShow.map((el) => (
          <TabList task={el} key={el.id} />
        ))}
      </div>
      <div>
        <h6>
          {!toShow.length
            ? "Empty list"
            : toShow.length === 1
            ? `${toShow.length} task listed`
            : `${toShow.length} tasks listed`}
        </h6>
      </div>
    </div>
  );
}

export default List;
