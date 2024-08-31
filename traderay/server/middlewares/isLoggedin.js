const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");

const isLoggedin = async (req, res, next) => {
  try {
    const token = await req.headers["authorization"].split("Bearer ")[1];

    if (token === "undefined" || token === "null") {
      return res.status(401).json({ success: false });
    } else {
      const data = await jwt.verify(token, "secret");
      const user = await userModel.findOne({ email: data.email });
      if (!user) {
        return res.status(401).json({ success: false });
      }
      req.user = user;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = isLoggedin;
