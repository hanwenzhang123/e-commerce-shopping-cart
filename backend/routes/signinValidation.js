const User = require("../models/userDB.js");
const bcrypt = require("bcrypt");

const signinValidation = async (req, res) => {
  const { email, secret } = req.body;
  try {
    const foundUser = await User.findAndValidate(email, secret);
    if (foundUser) {
      res.json("GOOD");
    } else {
      res.json("NO");
    }
  } catch (error) {
    console.log(error);
    res.status(404);
    res.render("404");
  }
};

module.exports = signinValidation;
