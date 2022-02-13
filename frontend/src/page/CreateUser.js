import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import { FormContainer } from "../UI/CommonStyle.js";
import { UserConstant } from "../store/constant";
import Input from "../component/Input.js";

export default function CreateUser(props) {
  const { setIsLogin } = props;
  const [data, setData] = useState(UserConstant);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = async (e) => {
    try {
      const url = "/api/signup";
      const res = await Axios.post(url, {
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        secret: data.secret,
      });
      console.log(res);
      // .then((res) => {
      //   alert("You have signed in successfully");
      //   setData(UserConstant);
      //   setIsLogin(true);
      // })
      // .catch((e) => {
      //   console.log(e);
      // });
    } catch (e) {
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
