import React from "react"

function ButtonMain({ innerText, onClick, type }) {
  return (
    <>
      <button className="buttonMain" onClick={onClick}>
        {innerText}
      </button>
    </>
  )
}

export default ButtonMain
