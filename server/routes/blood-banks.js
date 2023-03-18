const { Blood_bank, validate } = require("../models/blood-bank");
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
  const blood_banks = await Blood_bank.find().sort("blood_group");
  res.send(blood_banks);
});

/*router.get("/search", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const blood_bank = await Blood_bank.find({
    blood_group: req.body.blood_group,
  }).select("blood_group no_of_bags");
  //if not found, show error 404
  if (!blood_bank.length)
    return res
      .status(404)
      .send("The blood-bank with the given blood group not found");

  res.send(blood_bank);
});*/

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let blood_bank = new Blood_bank({
    blood_group: req.body.blood_group,
    no_of_bags: req.body.no_of_bags,
  });

  blood_bank = await blood_bank.save();
  res.send(blood_bank);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Invalid ID!");
  try {
    const blood_bank = await Blood_bank.findByIdAndUpdate(
      req.params.id,
      {
        blood_group: req.body.blood_group,
        no_of_bags: req.body.no_of_bags,
      },
      {
        new: true,
      }
    );
    if (!blood_bank)
      return res.status(404).send("The blood bank with the given id not found");
    res.send(blood_bank);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

router.delete("/:id", async (req, res) => {
  const blood_bank = await Blood_bank.findByIdAndRemove(req.params.id);

  if (!blood_bank)
    return res.status(404).send("The blood bank with the given id not found");

  res.send(blood_bank);
});

module.exports = router;
