import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./component/Navbar.js";
import Homepage from "./page/Homepage.js";
import Product from "./page/Product.js";
import ShoppingCart from "./page/ShoppingCart.js";
import Errorpage from "./page/Errorpage.js";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/product" element={<Product />} />
          <Route exact path="/cart" element={<ShoppingCart />} />
          <Route exact path="/404" element={<Errorpage />} />
          <Route path="/*" element={<Errorpage />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
