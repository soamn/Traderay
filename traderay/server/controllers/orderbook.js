const orderBookModel = require("../models/orderBookmodel");

const orderbook = async (req, res, next) => {
  try {
    const { event } = req.body;
    const ob = await orderBookModel
      .findOne({ event: event._id })
      .populate("yes")
      .populate("no");

    let yes_copy = [];
    let no_copy = [];

    if (ob) {
      yes_copy = [...ob.yes];
      no_copy = [...ob.no];

      for (let i = 0; i < yes_copy.length; i++) {
        for (let j = i + 1; j < yes_copy.length; j++) {
          if (yes_copy[i].price === yes_copy[j].price) {
            yes_copy[i].quantity += yes_copy[j].quantity;
            yes_copy.splice(j, 1);
          }
        }
      }
      for (i = 0; i < no_copy.length; i++) {
        for (j = i + 1; j < no_copy.length; j++) {
          if (no_copy[i].price === no_copy[j].price) {
            no_copy[i].quantity += no_copy[j].quantity;
            no_copy.splice(j, 1);
          }
        }
      }
    }

    return res.status(200).json({ yes_copy, no_copy });
  } catch (error) {
    console.log(error);
    res.status(500);
  }

  next();
};
module.exports = orderbook;
