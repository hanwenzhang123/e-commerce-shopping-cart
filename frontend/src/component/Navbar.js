import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import classes from "./style.module.css";

export default function Navbar(props) {
  const { isLogin } = props;

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const userHandler = () => {
    window.location.href = "/user";
  };

  const shoppingCartHandler = (e) => {
    window.location.href = "/cart";
  };

  return (
    <nav className={classes.navigation}>
      <div className={classes.iconLeft}>
        <PersonIcon className={classes.personIcon} onClick={userHandler} />
        {isLogin && <p>logged in</p>}
      </div>
      <div className={classes.searchBar}>
        <input
          type="text"
          placeholder="search..."
          id="search-input"
          onChange={handleChange}
        />
        <SearchIcon className={classes.searchIcon} />
      </div>
      <div className={classes.iconRight}>
        <ShoppingCartIcon
          className={classes.shoppingCart}
          onClick={shoppingCartHandler}
        />
      </div>
    </nav>
  );
}
