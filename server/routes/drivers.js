const { Driver, validate } = require("../models/driver");
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
  const drivers = await Driver.find().sort("name").select("_id name phone");
  res.send(drivers);
});

router.get("/:id", async (req, res) => {
  const driver = await Driver.findById(req.params.id);

  if (!driver)
    return res.status(404).send("The driver with the given id not found");

  res.send(driver);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const driver = new Driver({
    name: req.body.name,
    phone: req.body.phone,
  });

  await driver.save();
  res.send(driver);
});

module.exports = router;
