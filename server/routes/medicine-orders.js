const { User } = require("../models/user");
const { Medicine } = require("../models/medicine");
const { Medicine_order, validate } = require("../models/medicine-order");
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
  const medicine_orders = await Medicine_order.find().sort("-date");
  res.send(medicine_orders);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid User");

  const medicine = await Medicine.findById(req.body.medicineId);
  if (!medicine) return res.status(400).send("Invalid Medicine");

  const medicine_order = new Medicine_order({
    user: {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
    },
    medicine: req.body.medicineId,
    location: req.body.location,
    reqstd_no_of_medicine: req.body.reqstd_no_of_medicine,
  });

  await medicine_order.save();

  medicine.stock -= req.body.reqstd_no_of_medicine;
  medicine.save();

  res.send(medicine_order);
});

router.delete("/:id", async (req, res) => {
  const medicine_order = await Medicine_order.findByIdAndRemove(req.params.id);

  if (!medicine_order)
    return res
      .status(404)
      .send("The Medicine Order with the given id not found");

  res.send(medicine_order);
});

module.exports = router;
