import React, { useState, useEffect } from "react";
import { Container } from "../UI/CommonStyle.js";
import Card from "../UI/Card.js";
import Spinner from "../UI/Spinner.js";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";

export default function Homepage(props) {
  const { isLogin, cartCount, setCartCount, search } = props;
  const [loading, setLoading] = useState(false);
  const [initialState, setInitialState] = useState([]);
  const [filteredState, setFilteredState] = useState([]);

  const fetchData = async () => {
    try {
      const result = await fetch("/api").then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("not able to fetch data correctly");
        }
      });
      setInitialState(result);
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

  useEffect(() => {
    console.log(initialState);
  }, [initialState]);

  useEffect(() => {
    if (search.trim().length > 0 && initialState) {
      let result = initialState.filter(
        (each) =>
          each["title"].toLowerCase().includes(search) ||
          each["description"].toLowerCase().includes(search)
      );
      setFilteredState(result);
    }
  }, [search, initialState]);

  const handleClick = (id) => {
    window.location = "/product/" + id;
  };

  const addToCart = (id) => {
    console.log(id);
    setCartCount(cartCount + 1);
  };

  const handleAddClick = () => {
    window.location = "/product";
  };

  return (
    <React.Fragment>
      <Container>
        <div
          style={{
            marginBottom: "20px",
            textAlign: "center",
            lineHeight: "1.5",
          }}
        >
          <h1>This is Home Page</h1>
          <p>Here are all the products we have in MongoDB</p>
          <p>Click the card to view detail or edit or delete</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {search.trim().length > 0 ? (
            filteredState.length > 0 ? (
              filteredState.map((each, index) => {
                return (
                  <Card key={index}>
                    <ul onClick={() => handleClick(each.id)}>
                      <li>
                        Title: <b>{each.title}</b>
                      </li>
                      <li>
                        Description: <b>{each.description}</b>
                      </li>
                      <li>
                        Quantity: <b>{each.quantity}</b>
                      </li>
                      <li>
                        Price: <b>${each.price}</b>
                      </li>
                    </ul>
                    <AddShoppingCartIcon
                      style={{
                        position: "relative",
                        left: "120px",
                        top: "20px",
                      }}
                      onClick={() => addToCart(each.id)}
                    />
                  </Card>
                );
              })
            ) : (
              <h3 style={{ color: "red", margin: "50px" }}>
                No found result based on your search!
              </h3>
            )
          ) : (
            initialState.length > 0 &&
            initialState.map((each, index) => {
              return (
                <Card key={index}>
                  <ul onClick={() => handleClick(each.id)}>
                    <li>
                      Title: <b>{each.title}</b>
                    </li>
                    <li>
                      Description: <b>{each.description}</b>
                    </li>
                    <li>
                      Quantity: <b>{each.quantity}</b>
                    </li>
                    <li>
                      Price: <b>${each.price}</b>
                    </li>
                  </ul>
                  <AddShoppingCartIcon
                    style={{
                      position: "relative",
                      left: "80%",
                      top: "15px",
                    }}
                    onClick={() => addToCart(each.id)}
                  />
                </Card>
              );
            })
          )}
        </div>
        <div
          style={{
            marginTop: "30px",
          }}
        >
          {isLogin ? (
            <h3>
              Add a new item for sale
              <AddIcon
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                  position: "absolute",
                }}
                onClick={handleAddClick}
              />
            </h3>
          ) : (
            <h3>
              You have to log in in order to add a new product, or edit and
              delete existing ones!
            </h3>
          )}
        </div>
        {loading && <Spinner />}
      </Container>
    </React.Fragment>
  );
}
