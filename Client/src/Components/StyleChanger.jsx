import React from "react"

function StyleChanger({ dayStyle, setDayStyle }) {
  return (
    <div className="styleChanger">
      <button
        className={dayStyle ? "sunnyChanger" : "moonChanger"}
        onClick={() => setDayStyle(!dayStyle)}
      >
        {!dayStyle ? (
          <i class="fa-solid fa-moon"></i>
        ) : (
          <i class="fa-solid fa-sun"></i>
        )}
      </button>
    </div>
  )
}

export default StyleChanger
