import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddBar from "../Components/AddBar"
import Filter from "../Components/Filter"
import Footer from "../Components/Footer"
import List from "../Components/List"
import { getTasks, logoutStatus } from "../Redux/Actions"
import { useNavigate } from "react-router-dom"
import TaskEmail from "../Components/TaskEmail"
import NavBar from "../Components/NavBar"

function Home({ dayStyle }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTasks())
  }, [])

  const tasks = useSelector((state) => state.tasks)

  const [sort, setSort] = useState("Asc")
  const [filter, setFilter] = useState("All")

  return (
    <div className={dayStyle ? "sunnyHome" : "moonHome"}>
      <h1>2do List</h1>
      <AddBar />
      <Filter setFilter={setFilter} />
      <List sort={sort} setSort={setSort} tasks={tasks} filter={filter} />

      <div className="taskEmail">
        <TaskEmail />
      </div>
    </div>
  )
}

export default Home
