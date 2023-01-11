const { Appointment, validate } = require("../models/appointment");
const { Doctor } = require("../models/doctor");
const { User } = require("../models/user");
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
  const appointments = await Appointment.find().sort("-date");
  res.send(appointments);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const doctor = await Doctor.findById(req.body.doctorId);
  if (!doctor) return res.status(400).send("Invalid Doctor");

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid User");

  const appointment = new Appointment({
    user: {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
    },
    doctor: {
      _id: doctor._id,
      name: doctor.name,
      sitting_time: doctor.sitting_time,
      qualifications: doctor.qualifications,
    },
    patient_name: req.body.patient_name,
    patient_sex: req.body.patient_sex,
    patient_age: req.body.patient_age,
    appointment_date: req.body.appointment_date,
  });

  await appointment.save();
  res.send(appointment);
});

router.delete("/:id", async (req, res) => {
  const appointment = await Appointment.findByIdAndRemove(req.params.id);

  //if not found, show error 404
  if (!appointment)
    return res.status(404).send("The Appointment with the given id not found");

  //return the deleted user info
  res.send(appointment);
});

module.exports = router;
