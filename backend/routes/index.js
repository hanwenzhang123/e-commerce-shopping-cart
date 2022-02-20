const express = require("express");
const router = express.Router();

//Routes
const displayAllProducts = require("./displayAllProducts.js");
const displayProductInfo = require("./displayProductInfo");
const createNewProduct = require("./createNewProduct.js");
const saveEditProduct = require("./saveEditProduct");
const deleteProduct = require("./deleteProduct");

const displayUserInfo = require("./displayUserInfo");
const displayCurrentUserInfo = require("./displayCurrentUserInfo");
const createNewUser = require("./createNewUser.js");
const signinValidation = require("./signinValidation.js");

const createShoppingOrder = require("./createShoppingOrder.js");
const getOrderDetails = require("./getOrderDetails.js");
const getLastOrder = require("./getLastOrder.js");
const displayUserOrderInfo = require("./displayUserOrderInfo");
const updateProductQuantity = require("./updateProductQuantity");

router.get("/", displayAllProducts);
router.get("/product/:id", displayProductInfo);
router.post("/product", createNewProduct);
router.post("/product/edit/:id", saveEditProduct);
router.delete("/product/delete/:id", deleteProduct);

router.get("/user", displayUserInfo);
router.get("/user/:id", displayCurrentUserInfo);
router.post("/signup", createNewUser);
router.post("/signin", signinValidation);

router.get("/order/:id", getOrderDetails);
router.get("/lastOrder/", getLastOrder);
router.get("/user/order/:id", displayUserOrderInfo);
router.post("/order", createShoppingOrder);
router.post("/product/order/:id", updateProductQuantity);

module.exports = router;
