const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: { type: String },
  yes: { type: Number },
  no: { type: Number },
  startTime: { type: String },
  endTime: { type: String },
  filedata: { type: Buffer },
});

const eventModel = mongoose.model("event", eventSchema);
module.exports = eventModel;
