import React, { useState } from "react";

export default function Input(props) {
  const { label, type, id, placeholder } = props;

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    let temp = e.target.value;
    console.log(temp);
    setValue(temp);
  };

  return (
    <React.Fragment>
      <label>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required
      ></input>
    </React.Fragment>
  );
}
