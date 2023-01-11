//const authorize = require("../middleware/authorize");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
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
  const users = await User.find().sort("name");
  res.send(users);
});

router.get("/:id", async (req, res) => {
  //find user on db
  const user = await User.findById(req.params.id).select("-password");
  //if not found, show error 404
  if (!user)
    return res.status(404).send("The user with the given id not found");
  //show user info
  res.send(user);
});

//router.get("/me", authorize, async (req, res) => {
//find user on db
///const user = await User.findById(req.user._id).select("-password");
//if not found, show error 404
//if (!user)
//  return res.status(404).send("The user with the given id not found");
//show user info
//res.send(user);
//});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    blood_group: req.body.blood_group,
    address: req.body.address,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["name", "email", "phone", "blood_group", "address"]));
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Invalid ID!");

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      blood_group: req.body.blood_group,
      address: req.body.address,
    },
    {
      new: true,
    }
  );
  if (!user)
    return res.status(404).send("The user with the given id not found");

  res.send(_.pick(user, ["name", "email", "phone", "blood_group", "address"]));
});

router.delete("/:id", async (req, res) => {
  //find user on db and delete
  const user = await User.findByIdAndRemove(req.params.id);

  //if not found, show error 404
  if (!user)
    return res.status(404).send("The user with the given id not found");

  //return the deleted user info
  res.send(user);
});

module.exports = router;
