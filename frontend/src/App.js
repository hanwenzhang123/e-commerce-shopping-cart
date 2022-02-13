import React, { useState, useContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./component/Navbar.js";
import Homepage from "./page/Homepage.js";
import Product from "./page/Product.js";
import ShoppingCart from "./page/ShoppingCart.js";
import Errorpage from "./page/Errorpage.js";
import CreateUser from "./page/CreateUser.js";
import SigninUser from "./page/SigninUser.js";
import UserInfo from "./page/UserInfo.js";
import ProductList from "./page/ProductList.js";
import AuthContext from "./store/auth-context";

function App() {
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const auth = useContext(AuthContext);
  const isLoggedIn = auth.isLoggedIn;

  console.log(isLoggedIn);

  return (
    <React.Fragment>
      <Navbar
        isLoggedIn={isLoggedIn}
        cartCount={cartCount}
        setSearch={setSearch}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Homepage
              isLoggedIn={isLoggedIn}
              cartCount={cartCount}
              setCartCount={setCartCount}
              search={search}
            />
          }
        />
        <Route exact path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductList />} />
        <Route
          exact
          path="/user"
          element={isLoggedIn ? <UserInfo /> : <Navigate to="/signup" />}
        />
        <Route
          exact
          path="/signin"
          element={isLoggedIn ? <Navigate to="/user" /> : <SigninUser />}
        />
        <Route exact path="/signup" element={<CreateUser />} />
        <Route exact path="/cart" element={<ShoppingCart />} />
        <Route exact path="/404" element={<Errorpage />} />
        <Route path="/*" element={<Errorpage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
