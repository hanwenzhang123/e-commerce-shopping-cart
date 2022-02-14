const User = require("../models/userDB.js");
const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

const signinValidation = async (req, res) => {
  const { email, secret } = req.body;

  try {
    const foundUser = await User.findAndValidate(email, secret);
    if (foundUser) {
      const accessToken = generateAccessToken(email);
      const id = foundUser._id;
      res.json({ id, accessToken });
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
