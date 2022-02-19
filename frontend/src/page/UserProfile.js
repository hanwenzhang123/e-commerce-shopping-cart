import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Button } from "../UI/CommonStyle.js";
import Card from "../UI/Card.js";
import Spinner from "../UI/Spinner.js";
import InfoIcon from "@mui/icons-material/Info";

export default function UserProfile(props) {
  const [loading, setLoading] = useState(false);
  const [userOrder, setUserOrder] = useState([]);
  const [userInfo, setUserInfo] = useState("");

  const params = useParams();
  const id = params.id;

  const fetchData = async (id) => {
    try {
      const result = await fetch("/api/user/order/" + id).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("not able to fetch data correctly");
        }
      });
      if (result.length > 0) {
        const userInfo = result[0].createdBy;
        setUserInfo(userInfo);
        setUserOrder(result);
      } else {
        setUserInfo("");
        setUserOrder([]);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    const loadData = async () => {
      await fetchData(id);
      if (isMounted) {
        setLoading(false);
        isMounted = false;
      }
    };
    loadData();
  }, [id]);

  // useEffect(() => {
  //   console.log(userInfo);
  // }, [userInfo]);

  // useEffect(() => {
  //   console.log(userOrder);
  // }, [userOrder]);

  const timeFormatting = (time) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const DateInfo = new Date(time);
    const formattedDate = DateInfo.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  return (
    <React.Fragment>
      <Container>
        {userInfo ? (
          <h2 style={{ marginBottom: "20px" }}>
            You are viewing{" "}
            <span style={{ fontSize: "30px", margin: "10px" }}>
              {userInfo.firstName}
            </span>
            's profile page
          </h2>
        ) : (
          <div style={{ textAlign: "center", margin: "30px" }}>
            <h1>No orders found from the selected user!</h1>
          </div>
        )}
        <div>
          {userOrder.length > 0 &&
            userOrder.map((each, index) => {
              return (
                <Card key={index}>
                  <p>
                    Order placed on: <b>{timeFormatting(each.createdAt)}</b>
                  </p>
                  <p>
                    Total Spent: <b>${each.total}</b>
                  </p>
                  <p>Order details:</p>
                  <ul style={{ marginLeft: "30px" }}>
                    {each.order.map((order, index) => {
                      return (
                        <li key={index}>
                          {order.quantity} <b>{order.title}</b> at $
                          {order.price} each.
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              );
            })}
        </div>
        {loading && <Spinner />}
        <Button
          style={{ marginTop: "30px", width: "20%" }}
          onClick={() => (window.location = "/user")}
        >
          Go Back
        </Button>
        <Link to="/" style={{ marginTop: "30px" }}>
          Go to Home Page
        </Link>
      </Container>
    </React.Fragment>
  );
}
