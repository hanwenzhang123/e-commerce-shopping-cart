import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../UI/CommonStyle.js";

export default function UserInfo() {
  return (
    <React.Fragment>
      <Container>
        <p style={{ marginBottom: "20px" }}>
          "This is user info page meaning you have already signed in"
        </p>
        <Link to="/">Go to Home Page</Link>
      </Container>
    </React.Fragment>
  );
}
