import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../UI/CommonStyle.js";

export default function ShoppingCart(props) {
  const { isLogin } = props;
  return (
    <React.Fragment>
      <Container>
        <h1 style={{ marginBottom: "20px" }}>"This is ShoppingCart"</h1>
        <Link to="/">Go to Home Page</Link>
      </Container>
    </React.Fragment>
  );
}
