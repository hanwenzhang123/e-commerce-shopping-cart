const Product = require("../models/productDB.js");

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id || req.query.id;
    console.log(id);
    Product.findById(id, (err, product) => {
      if (err) throw err;
      if (!product) return res.render("404");

      product.remove((err) => {
        if (err) throw err;
      });
    });
  } catch (error) {
    console.log(error);
    res.status(404);
    res.render("404");
  }
};

module.exports = deleteProduct;
