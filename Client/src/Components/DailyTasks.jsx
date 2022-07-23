import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ButtonMain from "./Buttons & Inputs/ButtonMain"
import Footer from "./Footer"
import ListDailyTasks from "./ListDailyTasks"
import { getTasks } from "../Redux/Actions"

function DailyTasks() {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.userInfo)

  const date = new Date()
  const date2Show = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10)

  const timeLimitTask =
    userInfo &&
    userInfo.tasks.filter(
      (el) => el.timeLimit !== "not-defined" && el.taskStatus === "Active"
    )

  const timeOutOnes =
    timeLimitTask && timeLimitTask.filter((el) => el.timeLimit < date2Show)

  const todayTasks =
    timeLimitTask && timeLimitTask.filter((el) => el.timeLimit === date2Show)
  console.log(todayTasks)

  dispatch(getTasks())

  return (
    <>
      {userInfo && (
        <div className="dailyTasks">
          <h2>Hi {userInfo.nickname.toUpperCase()}</h2>

          {timeOutOnes.length > 0 && (
            <div className="overdueTasks">
              <h2 className="h2">Overdue tasks</h2>
              <p>Take a little time to review tasks that are overdue</p>
              <div className="timeOutTasks">
                <ListDailyTasks tasks={timeOutOnes} />
              </div>
            </div>
          )}

          {todayTasks.length > 0 && (
            <div className="todayTasks">
              <h2 className="h2">Today tasks</h2>
              <p>These tasks have a due limit for today</p>
              <div className="timeOutTasks">
                <ListDailyTasks tasks={todayTasks} />
              </div>
            </div>
          )}

          <div className="btnAll">
            <ButtonMain
              className="buttonMain"
              onClick={() => navigate("/home")}
              innerText="Go to all tasks"
            />
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

export default DailyTasks
