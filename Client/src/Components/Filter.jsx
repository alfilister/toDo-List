import React from "react"
import ButtonMain from "./Buttons & Inputs/ButtonMain"

function Filter({ setFilter }) {
  const handleFilter = (e) => {
    e.preventDefault()
    setFilter(e.target.name)
  }

  return (
    <div className="filter">
      <h3>Filter by status</h3>

      <ButtonMain
        className="buttonGeneral"
        name="Active"
        onClick={(e) => handleFilter(e)}
        innerText="Active"
      />
      <ButtonMain
        className="buttonGeneral"
        name="Done"
        onClick={(e) => handleFilter(e)}
        innerText="Done"
      />
      <ButtonMain
        className="buttonGeneral"
        name="All"
        onClick={(e) => handleFilter(e)}
        innerText="All"
      />
    </div>
  )
}

export default Filter
