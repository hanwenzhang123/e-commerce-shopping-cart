const express = require("express");
const router = express.Router();

const User = require("../models/userDB.js");
const Product = require("../models/productDB.js");

const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
};

//Routes
const displayAllProducts = require("./displayAllProducts.js");
const displayProductInfo = require("./displayProductInfo");
const createNewProduct = require("./createNewProduct.js");
const saveEditProduct = require("./saveEditProduct");
const deleteProduct = require("./deleteProduct");

const displayUserInfo = require("./displayUserInfo");
const createNewUser = require("./createNewUser.js");
const signinValidation = require("./signinValidation.js");

router.get("/", displayAllProducts);
router.get("/product/:id", displayProductInfo);
router.post("/product", createNewProduct);
router.post("/product/edit/:id", saveEditProduct);
router.delete("/product/delete/:id", deleteProduct);

router.get("/user", displayUserInfo);
router.post("/signup", createNewUser);
router.post("/signin", signinValidation);

module.exports = router;
