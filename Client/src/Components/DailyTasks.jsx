import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ButtonMain from "./Buttons & Inputs/ButtonMain"
import TabList from "./TabList"

function DailyTasks() {
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.userInfo)

  const currentDay = new Date()
  const date2Show = currentDay.toISOString().slice(0, 10)

  const timeLimitTask =
    userInfo && userInfo.tasks.filter((el) => el.timeLimit !== "not-defined")

  const timeOutOnes =
    timeLimitTask && timeLimitTask.filter((el) => el.timeLimit < date2Show)

  const todayTasks =
    timeLimitTask && timeLimitTask.filter((el) => el.timeLimit === date2Show)
  console.log(todayTasks)

  return (
    <>
      {userInfo && (
        <div className="dailyTasks">
          <ButtonMain
            className="buttonMain"
            onClick={() => navigate("/home")}
            innerText="View your tasks"
          />
          <h2>Hi {userInfo.nickname.toUpperCase()}</h2>
          <h3>Date {date2Show}</h3>
          <div className="timeOutTasks">
            {/* {timeOutOnes.map((el) => (
              <TabList
                task={el}
                key={el.task}
                logginStatus={logginStatus}
                userRole={userRole}
              />
            ))} */}
          </div>
        </div>
      )}
    </>
  )
}

export default DailyTasks
