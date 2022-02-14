import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import { CartContextProvider } from "./store/cart-context";

ReactDOM.render(
  <AuthContextProvider>
    <CartContextProvider>
      <Router>
        <App />
      </Router>
    </CartContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
