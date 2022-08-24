const { Seat, validate } = require("../models/seat");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.use(function (req, res, next) {
  res.header({ "Access-Control-Allow-Origin": "*" });
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/", async (req, res) => {
  const seats = await Seat.find().sort("cost");
  res.send(seats);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const seat = new Seat({
    seat_no: req.body.seat_no,
    cost: req.body.cost,
    type: req.body.type,
  });

  await seat.save();
  res.send(seat);
});

module.exports = router;
