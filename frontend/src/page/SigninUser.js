import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import { FormContainer } from "../UI/CommonStyle.js";
import { LoginConstant } from "../store/constant";
import Input from "../component/Input.js";
import AuthContext from "../store/auth-context";

export default function CreateUser(props) {
  const [data, setData] = useState(LoginConstant);
  const auth = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/signin";
      await Axios.post(url, {
        email: data.email,
        secret: data.secret,
      }).then((res) => {
        if (res.data === "NO") {
          alert("You did not pass the authentication! Check again!");
          window.location.reload();
        } else if (res.data === "GOOD") {
          alert("You have passed authentication and signed in successfully!");
          window.location = "/";
          setData(LoginConstant);
          // auth.log();
        }
      });
    } catch (e) {
      alert("Something goes wrong, please check!");
      console.log(e);
    }
    // const expirationTime = new Date(
    //   new Date.getTime() + +data.expiresIn * 1000
    // ); //+ converts to number, *1000 from seconds to milliseconds
    // authCtx.login(data.idToken, expirationTime.toISOString);

    // alert("You have signed in successfully!");
    // setData(UserConstant);
    // window.location = "/";
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
