import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import classes from "./style.module.css";

export default function Navbar() {
  return (
    <nav className={classes.navigation}>
      <div class={classes.iconLeft}>
        <PersonIcon className={classes.personIcon} />
      </div>
      <div className={classes.searchBar}>
        <input type="text" placeholder="search..." id="search-input" />
        <SearchIcon className={classes.searchIcon} />
      </div>
      <div class={classes.iconRight}>
        <ShoppingCartIcon className={classes.shoppingCart} />
      </div>
    </nav>
  );
}
