import React from "react";
import AddBar from "../Components/AddBar";
import Filter from "../Components/Filter";
import List from "../Components/List";

function Home() {
  return (
    <div>
      <h1>ToDo List</h1>
      <AddBar />
      <Filter />
      <List />
    </div>
  );
}

export default Home;
