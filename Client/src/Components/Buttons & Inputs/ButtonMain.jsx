import React from "react"

function ButtonMain({ innerText, onClick, type, name }) {
  return (
    <>
      <button className="buttonMain" onClick={onClick} type={type} name={name}>
        {innerText}
      </button>
    </>
  )
}

export default ButtonMain
