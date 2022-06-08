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

  const [sort, setSort] = useState("Asc");
  const [filter, setFilter] = useState("All");

  return (
    <div className="home">
      <h1>2do List</h1>
      <AddBar />
      <Filter setFilter={setFilter} />
      <List sort={sort} setSort={setSort} tasks={tasks} filter={filter} />
    </div>
  );
}

export default Home;
