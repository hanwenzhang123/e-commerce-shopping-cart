import React, { useState, useEffect } from "react";
import { FormContainer } from "../UI/CommonStyle.js";
import Input from "../component/Input.js";

export default function CreateUser() {
  const [userJSON, setUserJSON] = useState("");

  const handleUserJSON = (info) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    alert("You have signed in successfully");
    window.location.href = "/";
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <Input label="First Name" id="fname" type="text" />
        <Input label="Last Name" id="lname" type="text" />
        <Input label="Email" id="email" type="email" />
        <Input label="Password" id="password" type="password" />
        <input type="submit" value="Submit" />
        <p>Note: You have to log in in order to add a new product!</p>
      </FormContainer>
    </form>
  );
}
