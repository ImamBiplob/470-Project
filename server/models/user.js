const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  phone: {
    type: String,
    minlength: 9,
    maxlength: 15,
  },
  blood_group: {
    type: String,
    enum: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"],
  },
  address: String,
  date: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, email: this.email },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    phone: Joi.string().min(8).max(15),
    blood_group: Joi.string()
      .min(2)
      .valid("A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"),
    address: Joi.string(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
