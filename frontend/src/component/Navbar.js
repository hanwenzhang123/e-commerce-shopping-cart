import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import classes from "./style.module.css";

export default function Navbar(props) {
  const { isLogin, cartCount, setSearch } = props;

  const handleChange = (e) => {
    let inputValue = e.target.value.toLowerCase();
    setSearch(inputValue);
  };

  const userHandler = () => {
    if (isLogin) {
      window.location.href = "/user";
    } else {
      window.location.href = "/signup";
    }
  };

  const shoppingCartHandler = (e) => {
    window.location.href = "/cart";
  };

  return (
    <nav className={classes.navigation}>
      <div className={classes.iconLeft}>
        <PersonIcon className={classes.personIcon} onClick={userHandler} />
        {isLogin && (
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
