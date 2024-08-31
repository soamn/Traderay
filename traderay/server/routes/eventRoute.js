const express = require("express");
const router = express.Router();
const Event = require("../controllers/event.js");
router.route("/").post(Event.createEvent);
router.route("/").get(Event.showEvent);
module.exports = router;
