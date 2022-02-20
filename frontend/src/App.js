import React, { useState, useContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./component/Navbar.js";
import AuthContext from "./store/auth-context";

import Homepage from "./page/Homepage.js";
import Product from "./page/Product.js";
import ShoppingCart from "./page/ShoppingCart.js";
import Errorpage from "./page/Errorpage.js";
import CreateUser from "./page/CreateUser.js";
import SigninUser from "./page/SigninUser.js";
import UserInfo from "./page/UserInfo.js";
import ProductList from "./page/ProductList.js";
import OrderDetail from "./page/OrderDetail.js";
import UserProfile from "./page/UserProfile.js";

function App() {
  const [search, setSearch] = useState("");

  const auth = useContext(AuthContext);
  const isLoggedIn = auth.isLoggedIn;
  const user = auth.userId;

  return (
    <React.Fragment>
      <Navbar isLoggedIn={isLoggedIn} setSearch={setSearch} />
      <Routes>
        <Route
          exact
          path="/"
          element={<Homepage isLoggedIn={isLoggedIn} search={search} />}
        />
        <Route
          exact
          path="/cart"
          element={<ShoppingCart isLoggedIn={isLoggedIn} user={user} />}
        />
        <Route
          exact
          path="/product"
          element={isLoggedIn ? <Product /> : <Navigate to="/" />}
        />
        <Route
          path="/product/:id"
          element={isLoggedIn ? <ProductList /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/user"
          element={isLoggedIn ? <UserInfo /> : <Navigate to="/signup" />}
        />
        <Route
          path="/user/:id"
          element={isLoggedIn ? <UserProfile /> : <Navigate to="/signup" />}
        />
        <Route
          path="/order/:id"
          element={isLoggedIn ? <OrderDetail /> : <Navigate to="/signup" />}
        />
        <Route
          exact
          path="/signin"
          element={isLoggedIn ? <Navigate to="/user" /> : <SigninUser />}
        />
        <Route exact path="/signup" element={<CreateUser />} />
        <Route exact path="/404" element={<Errorpage />} />
        <Route path="/*" element={<Errorpage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
