import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import { FormContainer } from "../UI/CommonStyle.js";
import { UserConstant } from "../store/constant";
import Input from "../component/Input.js";

export default function CreateUser() {
  const [data, setData] = useState(UserConstant);

  const handleSubmit = async (e) => {
    const url = "/api/user";
    await Axios.post(url, {
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    alert("You have signed in successfully");
    setData(UserConstant);
    window.location.href = "/";
  };

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <Input
          label="First Name"
          id="fname"
          type="text"
          value={data["fname"]}
          handleChange={handleChange}
        />
        <Input
          label="Last Name"
          id="lname"
          type="text"
          value={data["lname"]}
          handleChange={handleChange}
        />
        <Input
          label="Email"
          id="email"
          type="email"
          value={data["email"]}
          handleChange={handleChange}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          value={data["password"]}
          handleChange={handleChange}
        />
        <input type="submit" value="Submit" />
        <p style={{ margin: "20px" }}>
          Note: You have to log in in order to add a new product!
        </p>
        <Link to="/">Go to Home Page</Link>
      </FormContainer>
    </form>
  );
}
