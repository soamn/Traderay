const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  option: { type: String },
  quantity: { type: Number },
  price: { type: Number },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
