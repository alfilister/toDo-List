import React from "react"

function ButtonMain({ innerText, onClick, type, name, className }) {
  return (
    <>
      <button className={className} onClick={onClick} type={type} name={name}>
        {innerText}
      </button>
    </>
  )
}

export default ButtonMain
