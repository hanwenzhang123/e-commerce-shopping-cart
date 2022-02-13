const Product = require("../models/productDB.js");

const saveEditProduct = async (req, res) => {
  try {
    const id = req.params.id || req.query.id;
    const title = req.body.title;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const price = req.body.price;

    const product = await Employee.findOneAndUpdate(
      { _id: id },
      { title, description, quantity, price }
    );
    if (!product) res.status(404);
    console.log(product);
  } catch (error) {
    console.log(error);
    res.status(404);
    res.render("404");
  }
};

module.exports = saveEditProduct;
