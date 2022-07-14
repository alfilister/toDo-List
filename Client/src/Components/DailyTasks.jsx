import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ButtonMain from "./Buttons & Inputs/ButtonMain"
import ListDailyTasks from "./ListDailyTasks"
import { getTasks } from "../Redux/Actions"

function DailyTasks() {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.userInfo)

  const currentDay = new Date()
  const date2Show = currentDay.toISOString().slice(0, 10)

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
              <h2>Overdue tasks</h2>
              <div className="timeOutTasks">
                <ListDailyTasks tasks={timeOutOnes} />
              </div>
            </div>
          )}

          <div className="todayTasks">
            <h2>Tasks with timeLimit set for today</h2>
            <div className="timeOutTasks">
              <ListDailyTasks tasks={todayTasks} />
            </div>
          </div>

          <div className="btnAll">
            <ButtonMain
              className="buttonMain"
              onClick={() => navigate("/home")}
              innerText="All tasks"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default DailyTasks
