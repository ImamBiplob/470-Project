const { User } = require("../models/user");
const { Ambulance } = require("../models/ambulance");
const { Ambulance_request, validate } = require("../models/ambulance-request");
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
  const ambulance_requests = await Ambulance_request.find().sort("-date");
  res.send(ambulance_requests);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid User");

  const ambulance = await Ambulance.findById(req.body.ambulanceId);
  if (!ambulance) return res.status(400).send("Invalid Ambulance");

  const ambulance_request = new Ambulance_request({
    user: {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
    },
    ambulance: ambulance,
    location: req.body.location,
  });

  await ambulance_request.save();

  ambulance.availability = false;
  ambulance.save();

  res.send(ambulance_request);
});

router.delete("/:id", async (req, res) => {
  const ambulance_request = await Ambulance_request.findByIdAndRemove(
    req.params.id
  );

  if (!ambulance_request)
    return res
      .status(404)
      .send("The Ambulance Request with the given id not found");

  res.send(ambulance_request);
});

module.exports = router;
