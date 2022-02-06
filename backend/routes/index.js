const express = require("express");
const router = express.Router();

const User = require("../models/userDB.js");
const Product = require("../models/productDB.js");

// const bcrypt = require("bcrypt");

const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
};

router.get("/", async (req, res) => {
  try {
    let products = await Product.find({});

    let results = products.map((each) => {
      return {
        title: each.title,
        description: each.description,
        quantity: each.quantity,
        price: each.price,
      };
    });

    res.json(results);
  } catch (error) {
    console.log(error);
    res.render("404");
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const id = req.body.id || req.query.id;
  } catch (error) {
    console.log(error);
    res.render("404");
  }
});

module.exports = router;
