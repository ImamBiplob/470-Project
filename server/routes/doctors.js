const { Doctor, validate } = require("../models/doctor");
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
  const doctors = await Doctor.find()
    .sort("name")
    .select("_id name email sitting_time qualifications");
  res.send(doctors);
});

router.get("/:id", async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor)
    return res.status(404).send("The doctor with the given id not found");

  res.send(doctor);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const doctor = new Doctor({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    blood_group: req.body.blood_group,
    address: req.body.address,
    sitting_time: req.body.sitting_time,
    qualifications: req.body.qualifications,
    availability: req.body.availability,
  });

  await doctor.save();
  res.send(doctor);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Invalid ID!");

  const doctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      blood_group: req.body.blood_group,
      address: req.body.address,
      sitting_time: req.body.sitting_time,
      qualifications: req.body.qualifications,
      availability: req.body.availability,
    },
    {
      new: true,
    }
  );
  if (!doctor)
    return res.status(404).send("The doctor with the given id not found");

  res.send(doctor);
});

router.delete("/:id", async (req, res) => {
  const doctor = await Doctor.findByIdAndRemove(req.params.id);

  if (!doctor)
    return res.status(404).send("The doctor with the given id not found");

  res.send(doctor);
});

module.exports = router;
