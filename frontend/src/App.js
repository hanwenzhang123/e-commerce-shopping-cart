import React, { useState } from "react";
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

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  return (
    <React.Fragment>
      <Navbar isLogin={isLogin} cartCount={cartCount} setSearch={setSearch} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Homepage
              isLogin={isLogin}
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
          element={isLogin ? <UserInfo /> : <Navigate to="/signup" />}
        />
        <Route
          exact
          path="/signup"
          element={<CreateUser setIsLogin={setIsLogin} />}
        />
        <Route
          exact
          path="/signin"
          element={<SigninUser setIsLogin={setIsLogin} />}
        />
        <Route exact path="/cart" element={<ShoppingCart />} />
        <Route exact path="/404" element={<Errorpage />} />
        <Route path="/*" element={<Errorpage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
