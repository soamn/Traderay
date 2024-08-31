const mongoose = require("mongoose");

const orderBookSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "event" },

  yes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  ],
  no: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
});

const orderBookModel = mongoose.model("orderBook", orderBookSchema);
module.exports = orderBookModel;
