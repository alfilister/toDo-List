import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddBar from "../Components/AddBar"
import Filter from "../Components/Filter"
import List from "../Components/List"
import { getTasks, logoutStatus } from "../Redux/Actions"
import { useNavigate } from "react-router-dom"
import TaskEmail from "../Components/TaskEmail"

function Home({ dayStyle }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTasks())
  }, [])

  const tasks = useSelector((state) => state.tasks)
  const userRole = useSelector((state) => state.userInfo.role)

  console.log(userRole)

  const [sort, setSort] = useState("Asc")
  const [filter, setFilter] = useState("All")

  return (
    <div className={dayStyle ? "sunnyHome" : "moonHome"}>
      <h1>2do List</h1>
      <AddBar />
      <Filter setFilter={setFilter} />
      <List sort={sort} setSort={setSort} tasks={tasks} filter={filter} />

      {userRole === "pro" && (
        <div className="emailSpace">
          <TaskEmail />
        </div>
      )}
    </div>
  )
}

export default Home
