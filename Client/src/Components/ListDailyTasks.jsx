import React from "react"
import TabListDaily from "./TabListDaily"

function ListDailyTasks({ tasks }) {
  //   const proFeature = (logginStatus, userRole) => {
  //     if (logginStatus && userRole === "pro") {
  //       return <h6>Detail</h6>
  //     }
  //   }

  //   const preShow =
  //     filter === "All" ? tasks : tasks.filter((el) => el.taskStatus === filter)

  const toShow = tasks.sort((a, b) => {
    if (a.priority > b.priority) {
      return 1
    }
    if (b.priority > a.priority) {
      return -1
    }
    if (a.task > b.task) {
      return 1
    }
    if (b.task > a.task) {
      return -1
    }
    return 0
  })

  return (
    <div className="listDayTasks">
      <header className="headerPro">
        <h6>Activities</h6>

        <div className="priority">
          <h6>Priority</h6>
        </div>

        <h6>Time Limit</h6>

        <h6>Status</h6>

        <h6>Detail</h6>

        <h6>Delete</h6>
      </header>
      <div className="tabsTasks">
        {toShow.map((el) => (
          <TabListDaily
            task={el}
            key={el.task}
            logginStatus={true}
            userRole="pro"
          />
        ))}
      </div>
      <div>
        <h6>
          {!toShow.length
            ? "Empty list"
            : toShow.length === 1
            ? `${toShow.length} task listed`
            : `${toShow.length} tasks listed`}
        </h6>
      </div>
    </div>
  )
}

export default ListDailyTasks
