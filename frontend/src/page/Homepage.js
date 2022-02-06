import React, { useState, useEffect } from "react";
import { Container } from "../UI/CommonStyle.js";
import Card from "../UI/Card.js";

export default function Homepage() {
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
        setInitialState(jsonResponse);
      });
  }, []);

  return (
    <React.Fragment>
      <Container>
        <div style={{ marginBottom: "20px" }}>
          <h1>This is Home Page</h1>
          <h2>Here are all the product list</h2>
        </div>
        {initialState.length > 0 &&
          initialState.map((each, index) => {
            return (
              <Card key={index}>
                {each.title}, {each.description}, {each.quantity}, ${each.price}
              </Card>
            );
          })}
      </Container>
    </React.Fragment>
  );
}
