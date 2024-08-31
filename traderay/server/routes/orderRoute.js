const express = require("express");
const router = express.Router();
const order = require("../controllers/order");
const isLoggedin = require("../middlewares/isLoggedin");
router.route("/").post(isLoggedin, order);

module.exports = router;
