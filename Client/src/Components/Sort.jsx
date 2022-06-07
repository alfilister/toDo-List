import React from "react";

function Sort({ setSort, sort }) {
  const handleSort = (e) => {
    e.preventDefault();
    setSort(e.target.value);
  };

  return (
    <div>
      <select value={sort} onChange={(e) => handleSort(e)}>
        <option disabled>Sort</option>
        <option value={"Asc"}>Asc</option>
        <option value={"Des"}>Des</option>
      </select>
    </div>
  );
}

export default Sort;
