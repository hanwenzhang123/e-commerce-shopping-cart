const express = require("express");
const router = express.Router();

const User = require("../models/userDB.js");
const Product = require("../models/productDB.js");

//Routes
const displayAllProducts = require("./displayAllProducts.js");
const createNewProduct = require("./createNewProduct.js");
const createNewUser = require("./createNewUser.js");

// const bcrypt = require("bcrypt");

const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
};

router.get("/", displayAllProducts);

router.get("/product/:id", async (req, res) => {
  try {
    const id = req.body.id || req.query.id;
  } catch (error) {
    console.log(error);
    res.render("404");
  }
});

router.post("/product", createNewProduct);

router.post("/user", createNewUser);

module.exports = router;
