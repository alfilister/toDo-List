import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddBar from "../Components/AddBar"
import Filter from "../Components/Filter"
import Footer from "../Components/Footer"
import List from "../Components/List"
import { getTasks, logoutStatus } from "../Redux/Actions"
import firebaseApp from "../Firebase/credenciales"
import { getAuth, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import TaskEmail from "../Components/TaskEmail"
import ButtonMain from "../Components/Buttons & Inputs/ButtonMain"

const auth = getAuth(firebaseApp)

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTasks())
  }, [])

  const tasks = useSelector((state) => state.tasks)
  const logginStatus = useSelector((state) => state.loggin)

  const [sort, setSort] = useState("Asc")
  const [filter, setFilter] = useState("All")

  const handleLogout = (e) => {
    e.preventDefault
    signOut(auth)
    dispatch(logoutStatus())
    navigate("/")
  }

  return (
    <div className="home">
      <ButtonMain
        innerText={logginStatus ? "Logout" : "Sign Up"}
        onClick={(e) => handleLogout(e)}
      />

      <h1>2do List</h1>
      <AddBar />
      <Filter setFilter={setFilter} />
      <List sort={sort} setSort={setSort} tasks={tasks} filter={filter} />

      <div className="taskEmail">
        <TaskEmail />
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}

export default Home
