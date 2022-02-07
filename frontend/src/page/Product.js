import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../UI/CommonStyle.js";

export default function Product() {
  return (
    <React.Fragment>
      <Container>
        <h1 style={{ marginBottom: "20px" }}>"This is Product Page"</h1>
        <Link to="/">Go to Home Page</Link>
      </Container>
    </React.Fragment>
  );
}
