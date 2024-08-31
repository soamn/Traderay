const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
