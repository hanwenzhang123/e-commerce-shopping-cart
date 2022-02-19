import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Container } from "../UI/CommonStyle.js";
import Card from "../UI/Card.js";
import Spinner from "../UI/Spinner.js";

export default function OrderDetail() {
  const [loading, setLoading] = useState(false);
  const [userOrder, setUserOrder] = useState([]);

  const fetchData = async (id) => {
    try {
      const result = await fetch("/api/user/order" + id).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("not able to fetch data correctly");
        }
      });
      setUserOrder(result);
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

  return (
    <React.Fragment>
      <Container>
        <h1>"This is OrderDetail"</h1>
        {loading && <Spinner />}
        <Link to="/" style={{ marginTop: "30px" }}>
          Go to Home Page
        </Link>
      </Container>
    </React.Fragment>
  );
}
