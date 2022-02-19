const Order = require("../models/orderDB.js");

const getOrderDetails = async (req, res) => {
  try {
    const id = req.params.id || req.query.id;
    const order = await Order.findOne({ _id: id }, (err, data) => {
      if (err) res.status(404);
      if (!data) {
        res.status(404);
      } else {
        return {
          id: each._id,
          order: each.order,
          total: each.total,
          createdBy: each.createdBy,
          createdAt: each.createdAt,
        };
      }
    });

    res.json(order);
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

module.exports = getOrderDetails;
