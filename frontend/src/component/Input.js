import React, { useState } from "react";

export default function Input(props) {
  const { label, type, id, min, step, value, placeholder, handleChange } =
    props;

  return (
    <React.Fragment>
      <label>{label}</label>
      <input
        id={id}
        type={type}
        min={min}
        step={step}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required
      ></input>
    </React.Fragment>
  );
}
