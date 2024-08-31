const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup = async (req, res, next) => {
  const { username, password } = req.body;
  const email = await req.body.email.toLowerCase();
  try {
    const salt = await bcrypt.genSalt(5);

    const passwordHash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      email,
      username: username,
      password: passwordHash,
    });

    if (user) {
      const token = await jwt.sign({ email }, "secret");

      return res.cookie("token", token).json({ token }).status(200);
    }
  } catch (error) {
    res.status(500).json({ error: "Error Signing Up" });
  }
  next();
};
const login = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(400).send({ msg: "something  went wrong" });
    }

    let isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      const token = await jwt.sign({ email }, "secret");
      res.cookie("token", token).json({ token, user }).status(200);
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = { signup, login };
