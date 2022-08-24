const { Ambulance, validate } = require("../models/ambulance");
const { Driver } = require("../models/driver");
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
  const ambulances = await Ambulance.find().sort("cost_per_hour");
  res.send(ambulances);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const driver = await Driver.findById(req.body.driverId);
  if (!driver) return res.status(400).send("Invalid Driver");

  const ambulance = new Ambulance({
    name: req.body.name,
    cost_per_hour: req.body.cost_per_hour,
    type: req.body.type,
    driver: {
      _id: driver._id,
      name: driver.name,
      phone: driver.phone,
    },
  });

  await ambulance.save();
  res.send(ambulance);
});

module.exports = router;
