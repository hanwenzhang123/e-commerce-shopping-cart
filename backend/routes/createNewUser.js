const User = require("../models/userDB.js");

const createNewProduct = async (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;

  let newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });

  try {
    await newUser.save();
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

module.exports = createNewProduct;
