const orderModel = require("../models/orderModel");
const orderBookModel = require("../models/orderBookmodel");
const eventModel = require("../models/eventModel");
async function matchOrder(newOrder, orderbook) {
  const oppositeBook = newOrder.option === "yes" ? orderbook.no : orderbook.yes;

  let match = "no-match";
  for (let i = 0; i < oppositeBook.length; i++) {
    const order = oppositeBook[i];
    const newOrder_userId = JSON.stringify(newOrder.user_id);
    const order_UserId = JSON.stringify(order.user_id);
    const Price = Number((10 - order.price).toFixed(1));
    const stringCompare = await newOrder_userId.localeCompare(order_UserId);

    if (newOrder.price === Price && stringCompare !== 0) {
      if (newOrder.quantity < order.quantity) {
        order.quantity -= newOrder.quantity;
        await order.save();
        match = "full-match";
      } else if (newOrder.quantity > order.quantity) {
        newOrder.quantity -= order.quantity;
        await newOrder.save();
        oppositeBook.splice(i, 1);
        await orderbook.save();
        match = "half-match";
      } else if (newOrder.quantity === order.quantity) {
        await newOrder.save();
        newOrder.quantity -= order.quantity;
        oppositeBook.splice(i, 1);
        await orderbook.save();
        match = "full-match";
      }

      break;
    }
  }
  return match;
}
const placeOrder = async (newOrder) => {
  const orderbook = await orderBookModel
    .findOneAndUpdate({ event: newOrder.event._id })
    .populate({ path: "yes" })
    .populate({ path: "no" });

  const match = await matchOrder(newOrder, orderbook);

  if (match === "full-match") {
    console.log("order-executed");
  } else if (match === "half-match" || match === "no-match") {
    if (newOrder.option === "yes") {
      orderBookModel
        .findOne({ event: newOrder.event._id })
        .populate({ path: "yes" })
        .populate({ path: "no" });
      orderbook.yes.push(newOrder);
      orderbook.yes.sort((a, b) => a.price - b.price);
      await orderbook.save();
    } else {
      orderBookModel
        .findOne({ event: newOrder.event._id })
        .populate({ path: "yes" })
        .populate({ path: "no" });

      orderbook.no.push(newOrder);
      orderbook.no.sort((a, b) => b.price - a.price);
      await orderbook.save();
    }
  }
};
const order = async (req, res, next) => {
  try {
    const user = req.user;

    const { option, quantity, price, event } = req.body;

    if (!option || !price || !quantity || !event) {
      return res.status(404).jsonp({ error: "incomplete " });
    }

    const existing_event = await eventModel.findOne({ _id: event._id });
    if (!existing_event) {
      return res.staus(404).jsonp({ error: "not found" });
    }
    const newOrder = await orderModel.create({
      option,
      quantity,
      price,
      event: event._id,
      user_id: user._id,
    });

    let orderbook = await orderBookModel.findOne({ event: event._id });

    if (!orderbook) {
      if (newOrder.option === "yes") {
        orderbook = await orderBookModel
          .create({
            event: newOrder.event._id,
            yes: [newOrder],
          })
          .populate({ path: "yes" });
      } else {
        orderbook = await orderBookModel
          .create({
            event: newOrder.event._id,
            no: [newOrder],
          })
          .populate({ path: "yes" });
      }
      orderbook.save();
    }

    await placeOrder(newOrder, user);
    res.status(201).send({ msg: "suxess" });
  } catch (error) {
    return res.send(error).status(500);
  }
  next();
};

module.exports = order;
