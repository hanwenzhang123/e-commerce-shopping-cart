import React, { useState, useEffect, useContext } from "react";
import CartContext from "../store/cart-context";
import { Link } from "react-router-dom";
import { ShoppingCartConstant } from "../store/constant";
import { Container, Button } from "../UI/CommonStyle.js";
import Card from "../UI/Card.js";
import _ from "lodash";
import Axios from "axios";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function ShoppingCart(props) {
  const { isLoggedIn, user } = props;
  const cart = useContext(CartContext);
  const cartItems = cart.cartItems;

  const [price, setPrice] = useState(0);
  const [warning, showWarning] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    // console.log(cartItems);
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

      renderValue.sort((a, b) => {
        return a.eachPrice - b.eachPrice;
      });

      setShoppingCart(renderValue);
    } else {
      setPrice(0);
      setShoppingCart([]);
      showWarning(false);
    }
  }, [cartItems]);

  useEffect(() => {
    // console.log(shoppingCart);
    if (shoppingCart.length > 0) {
      let total = 0;
      let warning;
      for (let each of shoppingCart) {
        total += each.totalPrice;
        if (each.selectedQuantity > each.stockQuantity) {
          warning = true;
        }
      }
      if (warning) {
        showWarning(true);
      } else {
        showWarning(false);
      }
      setPrice(Number(total.toFixed(2)));
    }
  }, [shoppingCart]);

  // useEffect(() => {
  //   console.log(cartItemsCopy);
  // }, [cartItemsCopy]);

  const cartItemsSearch = (title) => {
    if (cartItems.length > 0) {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i]?.title === title) {
          return cartItems[i];
        }
      }
    }
  };

  const handleIncrease = (item, index) => {
    const foundItem = cartItemsSearch(item.title);
    cart.setCartItems(foundItem);
  };

  const handleDecrease = (item, index) => {
    const foundItem = cartItemsSearch(item.title);
    cart.deleteItem(foundItem);
  };

  const handleDelete = (item, index) => {
    const foundItem = cartItemsSearch(item.title);
    cart.deleteAllItems(foundItem);
  };

  const databaseUpdate = async (order) => {
    // console.log(order);
    for (let each of order) {
      const foundItem = cartItemsSearch(each.title);
      const id = foundItem.id;
      const orderQuantity = each.quantity;
      const quantityInStock = foundItem.quantity;
      const leftoverQuantity = quantityInStock - orderQuantity;
      try {
        const url = "/api/product/order/" + id;
        await Axios.post(url, {
          leftoverQuantity: leftoverQuantity,
        }).then((res) => {
          if (res.status === 200) {
            cart.checkoutItems();
          }
        });
      } catch (e) {
        alert("Something goes wrong, please check!");
        console.log(e);
      }
    }
  };

  const checkoutCart = async () => {
    if (shoppingCart.length === 0) {
      alert("You do not have any item in your shopping cart to checkout.");
      return;
    }
    if (!isLoggedIn) {
      alert("You have to log in first in order to process the order.");
      return;
    }
    if (warning) {
      alert("You selected more items than the existing quantity in stock.");
      return;
    }

    const data = {
      order: [],
      total: price,
      user: user,
    };

    for (let each of shoppingCart) {
      const temp = { title: "", quantity: 0, price: 0 };
      temp.title = each.title;
      temp.quantity = each.selectedQuantity;
      temp.price = each.eachPrice;
      data.order.push(temp);
    }

    try {
      const url = "/api/order";
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.ok) {
          databaseUpdate(data.order);
        }
      });
    } catch (e) {
      alert("Something goes wrong, please check!");
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <Container>
        <h1 style={{ marginBottom: "20px" }}>
          Shopping Cart - Total: ${price}
        </h1>
        <Button style={{ width: "20%" }} onClick={() => checkoutCart()}>
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
                      Unit Price: <b>${each.eachPrice.toFixed(2)}</b>
                    </li>
                    <li>
                      Total Price: <b>${each.totalPrice.toFixed(2)}</b>
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
                      onClick={() => handleIncrease(shoppingCart[index], index)}
                    />
                    <RemoveCircleOutlineIcon
                      onClick={() => handleDecrease(shoppingCart[index], index)}
                    />
                    <DeleteOutlineIcon
                      onClick={() => handleDelete(shoppingCart[index], index)}
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
