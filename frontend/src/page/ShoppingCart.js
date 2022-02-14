import React, { useState, useEffect, useContext } from "react";
import CartContext from "../store/cart-context";
import { Link } from "react-router-dom";
import { Container, Button } from "../UI/CommonStyle.js";
import Card from "../UI/Card.js";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function ShoppingCart() {
  const cart = useContext(CartContext);
  const cartItems = cart.cartItems;

  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    if (cartItems.length > 0) {
      console.log(cartItems);
      const tempMap = {};
      setShoppingCart(cartItems);
    }
  }, [cartItems]);

  const handleIncrease = () => {
    console.log("increase");
  };
  const handleDecrease = () => {
    console.log("decrease");
  };
  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <React.Fragment>
      <Container>
        <h1 style={{ marginBottom: "30px" }}>Shopping Cart</h1>
        <Button style={{ width: "20%" }} onClick={() => cart.clearCartItems()}>
          Process Order
        </Button>
        <Button style={{ width: "20%" }} onClick={() => cart.clearCartItems()}>
          Clear Shopping Cart
        </Button>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px",
          }}
        >
          {shoppingCart.length > 0 &&
            shoppingCart.map((each, index) => {
              return (
                <Card key={index}>
                  <ul>
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10%",
                      width: "100%",
                    }}
                  >
                    <AddCircleOutlineIcon onClick={handleIncrease} />
                    <RemoveCircleOutlineIcon onClick={handleDecrease} />
                    <DeleteOutlineIcon onClick={handleDelete} />
                  </div>
                </Card>
              );
            })}
        </div>

        <Link style={{ margin: "15px" }} to="/">
          Go to Home Page
        </Link>
      </Container>
    </React.Fragment>
  );
}
