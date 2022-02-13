import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import { FormContainer } from "../UI/CommonStyle.js";
import { UserConstant } from "../store/constant";
import Input from "../component/Input.js";
import AuthContext from "../store/auth-context";

export default function CreateUser(props) {
  const { setIsLogin } = props;
  const auth = useContext(AuthContext);
  const [data, setData] = useState(UserConstant);

  const handleSubmit = async (e) => {
    e.preventDefault();
    auth.login();
    // const expirationTime = new Date(
    //   new Date.getTime() + +data.expiresIn * 1000
    // ); //+ converts to number, *1000 from seconds to milliseconds
    // authCtx.login(data.idToken, expirationTime.toISOString);

    // const url = "/api/signin";
    // await Axios.post(url, {
    //   email: data.email,
    //   secret: data.secret,
    // })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // alert("You have signed in successfully");
    // setData(UserConstant);
    // window.location = "/";
    setIsLogin(true);
  };

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <h1 style={{ marginBottom: "30px" }}>
          <a href="/signup">Sign up</a> / <a href="/signin">Log in</a>
        </h1>

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
          type="secret"
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
