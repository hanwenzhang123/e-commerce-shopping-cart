import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./component/Navbar.js";
import Homepage from "./page/Homepage.js";
import Product from "./page/Product.js";
import ShoppingCart from "./page/ShoppingCart.js";
import Errorpage from "./page/Errorpage.js";
import CreateUser from "./page/CreateUser.js";
import UserInfo from "./page/UserInfo.js";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <React.Fragment>
      <Navbar isLogin={isLogin} />
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/product" element={<Product />} />
          <Route
            path="/user"
            element={isLogin ? <UserInfo /> : <CreateUser />}
          />
          <Route exact path="/cart" element={<ShoppingCart />} />
          <Route exact path="/404" element={<Errorpage />} />
          <Route path="/*" element={<Errorpage />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
