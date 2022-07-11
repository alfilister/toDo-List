import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ButtonMain from "./Buttons & Inputs/ButtonMain"

function DailyTasks() {
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.userInfo)

  const currentDay = new Date()
  const date2Show = currentDay.toISOString().slice(0, 10)

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
        </div>
      )}
    </>
  )
}

export default DailyTasks
