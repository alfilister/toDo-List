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

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTasks())
  }, [])

  const tasks = useSelector((state) => state.tasks)

  const [sort, setSort] = useState("Asc")
  const [filter, setFilter] = useState("All")
  const [dayStyle, setDayStyle] = useState(true)

  return (
    <div className={dayStyle ? "sunnyHome" : "moonHome"}>
      <NavBar dayStyle={dayStyle} setDayStyle={setDayStyle} />

      <h1>2do List</h1>
      <AddBar />
      <Filter setFilter={setFilter} />
      <List sort={sort} setSort={setSort} tasks={tasks} filter={filter} />

      <div className="taskEmail">
        <TaskEmail />
      </div>

      <Footer dayStyle={dayStyle} />
    </div>
  )
}

export default Home
