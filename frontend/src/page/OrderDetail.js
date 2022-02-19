import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../UI/CommonStyle.js";

export default function OrderDetail() {
  return (
    <React.Fragment>
      <Container>
        <h1>"This is OrderDetail"</h1>
        <Link to="/" style={{ marginTop: "30px" }}>
          Go to Home Page
        </Link>
      </Container>
    </React.Fragment>
  );
}
