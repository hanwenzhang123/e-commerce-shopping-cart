const express = require("express");
const router = express.Router();

// const bcrypt = require("bcrypt");

// const User = require("./models/userDB");
// const Product = require("./models/productDB");

const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
};

router.get("/", (req, res) => {
  res.json({
    hello: ["hello", "hi"],
  });
});

// router.get("/register", (req, res) => {
//   res.render("register");
// });

// router.post("/register", async (req, res) => {
//   const { password, username } = req.body;
//   const user = new User({ username, password });
//   await user.save();
//   req.session.user_id = user._id;
//   res.redirect("/");
// });

// router.get("/login", (req, res) => {
//   res.render("login");
// });

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const foundUser = await User.findAndValidate(username, password); //findAndValidate in user.js schema file defined
//   if (foundUser) {
//     req.session.user_id = foundUser._id; //if successfully login, we will store the user id into the session
//     res.redirect("/secret");
//   } else {
//     res.redirect("/login");
//   }
// });

// router.post("/logout", (req, res) => {
//   req.session.user_id = null; //set it to null
//   res.redirect("/login"); //back to login page
// });

// router.get("/secret", requireLogin, (req, res) => {
//   //we have the middleware here to require login
//   res.render("secret");
// });

// router.get("/topsecret", requireLogin, (req, res) => {
//   res.send("TOP SECRET!!!");
// });

module.exports = router;
