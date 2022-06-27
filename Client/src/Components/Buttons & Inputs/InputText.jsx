import React from "react"

function InputText({ name, value, placeholder, onChange }) {
  return (
    <>
      <input
        className="inputText"
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  )
}

export default InputText
