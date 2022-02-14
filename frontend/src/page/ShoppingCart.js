import React, { useState, useEffect, useContext } from "react";
import CartContext from "../store/cart-context";
import { Link } from "react-router-dom";
import { ShoppingCartConstant } from "../store/constant";
import { Container, Button } from "../UI/CommonStyle.js";
import Card from "../UI/Card.js";
import _ from "lodash";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function ShoppingCart() {
  const cart = useContext(CartContext);
  const cartItems = cart.cartItems;

  const [price, setPrice] = useState(0);
  const [warning, showWarning] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const tempMap = {};
      const renderValue = [];

      for (let i = 0; i <= cartItems.length; i++) {
        if (cartItems[i]) {
          if (tempMap[cartItems[i].title]) {
            tempMap[cartItems[i].title].selectedQuantity += 1;
            tempMap[cartItems[i].title].totalPrice += cartItems[i].price;
          } else {
            tempMap[cartItems[i].title] = {};
            tempMap[cartItems[i].title].selectedQuantity = 1;
            tempMap[cartItems[i].title].stockQuantity = cartItems[i].quantity;
            tempMap[cartItems[i].title].eachPrice = cartItems[i].price;
            tempMap[cartItems[i].title].totalPrice = cartItems[i].price;
            tempMap[cartItems[i].title].description = cartItems[i].description;
          }
        }
      }

      const titleKeys = Object.keys(tempMap);
      for (let i = 0; i < titleKeys.length; i++) {
        const template = _.cloneDeep(ShoppingCartConstant);
        template.title = titleKeys[i];
        template.description = tempMap[titleKeys[i]].description;
        template.stockQuantity = tempMap[titleKeys[i]].stockQuantity;
        template.selectedQuantity = tempMap[titleKeys[i]].selectedQuantity;
        template.eachPrice = tempMap[titleKeys[i]].eachPrice;
        template.totalPrice = tempMap[titleKeys[i]].totalPrice;
        renderValue.push(template);
      }

      setShoppingCart(renderValue);
    }
  }, [cartItems]);

  useEffect(() => {
    console.log(shoppingCart);
    if (shoppingCart.length > 0) {
      let total = 0;
      for (let each of shoppingCart) {
        total += each.totalPrice;
        if (each.selectedQuantity > each.stockQuantity) {
          showWarning(true);
        }
      }
      setPrice(total);
    }
  }, [shoppingCart]);

  const handleIncrease = (item) => {
    console.log("increase");
  };
  const handleDecrease = (item) => {
    console.log("decrease");
  };
  const handleDelete = (item) => {
    console.log("delete");
  };

  return (
    <React.Fragment>
      <Container>
        <h1 style={{ marginBottom: "20px" }}>
          Shopping Cart - Total: ${price}
        </h1>
        <Button style={{ width: "20%" }} onClick={() => cart.clearCartItems()}>
          Process Order
        </Button>
        <Button style={{ width: "20%" }} onClick={() => cart.clearCartItems()}>
          Clear Shopping Cart
        </Button>
        {warning && (
          <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
            <p>WARNING! </p>
            <p>
              You have selected more items than the existing ones stored in the
              stock!
            </p>
            <p>
              You will not be able to process the order! Please check again!
            </p>
          </div>
        )}
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
                  <h2>{each.title}</h2>
                  <p>
                    Description: <b>{each.description}</b>
                  </p>
                  <div
                    style={{
                      border: "solid lightgrey 1px",
                      borderRadius: "10px",
                      marginTop: "5px",
                      padding: "10px",
                    }}
                  >
                    <li style={{ color: warning && "red" }}>
                      Selected: <b>{each.selectedQuantity}</b>
                    </li>
                    <li style={{ color: warning && "red" }}>
                      In Stock: <b>{each.stockQuantity}</b>
                    </li>
                    <li>
                      Unit Price: <b>${each.eachPrice}</b>
                    </li>
                    <li>
                      Total Price: <b>${each.totalPrice}</b>
                    </li>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10%",
                      width: "100%",
                    }}
                  >
                    <AddCircleOutlineIcon
                      onClick={() => handleIncrease(shoppingCart[index])}
                    />
                    <RemoveCircleOutlineIcon
                      onClick={() => handleDecrease(shoppingCart[index])}
                    />
                    <DeleteOutlineIcon
                      onClick={() => handleDelete(shoppingCart[index])}
                    />
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
