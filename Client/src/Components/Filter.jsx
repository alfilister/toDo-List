import React from "react";

function Filter({ setFilter }) {
  const handleFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.name);
  };

  return (
    <div className="filter">
      <h3>Filter by status</h3>
      <button name="Active" onClick={(e) => handleFilter(e)}>
        Active
      </button>
      <button name="Done" onClick={(e) => handleFilter(e)}>
        Done
      </button>
      <button name="All" onClick={(e) => handleFilter(e)}>
        All
      </button>
    </div>
  );
}

export default Filter;
