import React, { useState, useEffect, useContext } from "react";
import CartContext from "../store/cart-context";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import classes from "./style.module.css";

export default function Navbar(props) {
  const { isLoggedIn, setSearch } = props;

  const cart = useContext(CartContext);
  const cartCount = cart.cartCount;

  const handleChange = (e) => {
    let inputValue = e.target.value.toLowerCase();
    setSearch(inputValue);
  };

  const userHandler = () => {
    if (isLoggedIn) {
      window.location = "/user";
    } else {
      window.location = "/signup";
    }
  };

  const shoppingCartHandler = (e) => {
    window.location = "/cart";
  };

  return (
    <nav className={classes.navigation}>
      <div className={classes.iconLeft}>
        <PersonIcon className={classes.personIcon} onClick={userHandler} />
        {isLoggedIn && (
          <p style={{ marginLeft: "10px", display: "inline" }}>logged in</p>
        )}
      </div>
      <div className={classes.searchBar}>
        <input
          type="text"
          placeholder="search by title/description..."
          id="search-input"
          onChange={handleChange}
        />
        <SearchIcon className={classes.searchIcon} />
      </div>
      <div className={classes.iconRight}>
        <p
          style={{
            right: "30px",
            top: "3px",
            display: "inline",
            position: "absolute",
          }}
        >
          {cartCount}
        </p>
        <ShoppingCartIcon
          className={classes.shoppingCart}
          onClick={shoppingCartHandler}
        />
      </div>
    </nav>
  );
}
