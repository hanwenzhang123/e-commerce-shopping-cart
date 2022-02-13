import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./component/Navbar.js";
import Homepage from "./page/Homepage.js";
import Product from "./page/Product.js";
import ShoppingCart from "./page/ShoppingCart.js";
import Errorpage from "./page/Errorpage.js";
import CreateUser from "./page/CreateUser.js";
import SigninUser from "./page/SigninUser.js";
import UserInfo from "./page/UserInfo.js";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  return (
    <React.Fragment>
      <Navbar isLogin={isLogin} cartCount={cartCount} setSearch={setSearch} />
      <Router>
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
          <Route path="/user" element={<UserInfo />} />
          <Route path="/signup" element={<CreateUser />} />
          <Route path="/signin" element={<SigninUser />} />
          <Route exact path="/cart" element={<ShoppingCart />} />
          <Route exact path="/404" element={<Errorpage />} />
          <Route path="/*" element={<Errorpage />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
