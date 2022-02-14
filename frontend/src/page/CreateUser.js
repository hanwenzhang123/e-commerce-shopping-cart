import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import { FormContainer } from "../UI/CommonStyle.js";
import { UserConstant } from "../store/constant";
import Input from "../component/Input.js";

export default function CreateUser(props) {
  const [data, setData] = useState(UserConstant);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/signup";
      await Axios.post(url, {
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        secret: data.secret,
      }).then((res) => {
        if (res.data === "OK") {
          alert("You have created a new user successfully! Please log in!");
          window.location = "/";
          setData(UserConstant);
        } else {
          alert("Email has been signed up with an account! Please retry!");
        }
      });
    } catch (e) {
      alert("Something goes wrong, please check!");
      console.log(e);
    }
  };

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <h1>
          <a href="/signup">Sign up</a> / <a href="/signin">Log in</a>
        </h1>
        <p style={{ margin: "30px" }}>
          Please do not enter a real password for secret field, it may be public
          exposed!
        </p>

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
          label="Secret"
          id="secret"
          type="password"
          minlength="6"
          value={data["secret"]}
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
