import React, { useState, useEffect } from "react";
import { Container } from "../UI/CommonStyle.js";

export default function Homepage() {
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonResponse) => setInitialState(jsonResponse.hello));
  }, []);

  return (
    <React.Fragment>
      <Container>
        <h1>"This is Home"</h1>
        {initialState.length > 0 &&
          initialState.map((each, index) => {
            return <p key={index}>{each}</p>;
          })}
      </Container>
    </React.Fragment>
  );
}
