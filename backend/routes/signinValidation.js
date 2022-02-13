const User = require("../models/userDB.js");

const signinValidation = async (req, res) => {
  const { email, secret } = req.body;
  const foundUser = await User.findAndValidate(email, secret);
  if (foundUser) {
    res.redirect("/");
  } else {
    res.redirect("/signin");
  }
};

module.exports = signinValidation;
