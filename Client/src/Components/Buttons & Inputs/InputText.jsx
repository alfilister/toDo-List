import React from "react"

function InputText({ type, name, value, placeholder, onChange }) {
  return (
    <>
      <input
        className="inputText"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  )
}

export default InputText
