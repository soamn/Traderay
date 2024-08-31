const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB);
const cors = require("cors");
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
const cookies = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(cookies());
app.use(bodyParser.json());
app.use(express.json());

const auth_route = require("./routes/authRoute.js");
const eventRoute = require("./routes/eventRoute");
const orderRoute = require("./routes/orderRoute");
const orderbookRoute = require("./routes/orderbookRoute");


app.use("/worker/event", eventRoute);
app.use("/events/order", orderRoute);
app.use("/events/orderbook", orderbookRoute);
app.use("/api/auth", auth_route);
app.use("/user",auth_route)
app.listen(process.env.PORT, () => {
  console.log("server listening on ", process.env.PORT);
});
