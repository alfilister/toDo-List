import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddBar from "../Components/AddBar";
import Filter from "../Components/Filter";
import List from "../Components/List";
import Sort from "../Components/Sort";
import { getTasks } from "../Redux/Actions";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const tasks = useSelector((state) => state.tasks);

  const [sort, setSort] = useState("Sort");
  const [filter, setFilter] = useState("All");

  var counter = tasks.length + 1;

  return (
    <div className="home">
      <h1>2do List</h1>
      <AddBar />
      <Filter setFilter={setFilter} />
      <Sort sort={sort} setSort={setSort} />
      <List tasks={tasks} filter={filter} sort={sort} />
    </div>
  );
}

export default Home;
