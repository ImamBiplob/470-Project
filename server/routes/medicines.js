const { Medicine, validate } = require("../models/medicine");
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
  const medicines = await Medicine.find().sort("cost");
  res.send(medicines);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const medicine = new Medicine({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
  });

  await medicine.save();
  res.send(medicine);
});

module.exports = router;
