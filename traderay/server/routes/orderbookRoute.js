const express = require("express");
const router = express.Router();
const orderbook = require("../controllers/orderbook");
router.route("/").post(orderbook);
module.exports = router;
