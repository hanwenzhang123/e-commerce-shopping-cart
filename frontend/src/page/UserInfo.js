import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Card.js";
import { Container, Button } from "../UI/CommonStyle.js";
import Spinner from "../UI/Spinner.js";

export default function UserInfo() {
  const [loading, setLoading] = useState(false);
  const [userState, setUserState] = useState([]);

  const fetchData = async () => {
    try {
      const result = await fetch("/api/user").then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("not able to fetch data correctly");
        }
      });
      setUserState(result);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    const loadData = async () => {
      await fetchData();
      if (isMounted) {
        setLoading(false);
        isMounted = false;
      }
    };
    loadData();
  }, []);

  const handleCreateUser = () => {
    window.location.href = "/signup";
  };

  return (
    <React.Fragment>
      <Container>
        <p style={{ marginBottom: "20px" }}>
          <b>This is user info page meaning you have already signed in</b>
        </p>
        <p>Below is your user info in the system</p>
        {userState.length > 0 &&
          userState.map((each, index) => {
            return (
              <Card key={index}>
                <ul>
                  <li>
                    First Name: <b>{each.firstName}</b>
                  </li>
                  <li>
                    Last Name: <b>{each.lastName}</b>
                  </li>
                  <li>
                    Email: <b>{each.email}</b>
                  </li>
                </ul>
              </Card>
            );
          })}
        <div style={{ width: "30%" }}>
          <Button onClick={handleCreateUser}>Create User</Button>
          <Button>Log out</Button>
        </div>

        <p style={{ marginTop: "30px" }}>
          Below are all the user info in the system
        </p>
        {userState.length > 0 &&
          userState.map((each, index) => {
            return (
              <Card key={index}>
                <ul>
                  <li>
                    First Name: <b>{each.firstName}</b>
                  </li>
                  <li>
                    Last Name: <b>{each.lastName}</b>
                  </li>
                  <li>
                    Email: <b>{each.email}</b>
                  </li>
                </ul>
              </Card>
            );
          })}
        {loading && <Spinner />}
        <Link to="/" style={{ marginTop: "20px" }}>
          Go to Home Page
        </Link>
      </Container>
    </React.Fragment>
  );
}
