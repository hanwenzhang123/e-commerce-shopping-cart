const express = require("express");
const router = express.Router();

const User = require("../models/userDB.js");
const Product = require("../models/productDB.js");

//Routes
const displayAllProducts = require("./displayAllProducts.js");
const createNewProduct = require("./createNewProduct.js");
const createNewUser = require("./createNewUser.js");
const signinValidation = require("./signinValidation.js");
const displayUserInfo = require("./displayUserInfo");
const displayProductInfo = require("./displayProductInfo");

const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
};

router.get("/", displayAllProducts);
router.get("/user", displayUserInfo);
router.get("/product/:id", displayProductInfo);

router.post("/product", createNewProduct);
router.post("/signup", createNewUser);
router.post("/signin", signinValidation);

module.exports = router;
