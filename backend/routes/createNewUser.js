const User = require("../models/userDB.js");
// const session = require("express-session");

const createNewProduct = async (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const secret = req.body.secret;

  let newUser = new User({
    firstName,
    lastName,
    email,
    secret,
  });

  try {
    await newUser.save();
    res.json("You have created a new user successfully");
    // req.session.user_id = newUser._id;
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

module.exports = createNewProduct;
