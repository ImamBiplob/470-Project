const Joi = require("joi");
const mongoose = require("mongoose");

userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  phone: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 15,
  },
  email: String,
});

const Medicine_order = mongoose.model(
  "Medicine-order",
  new mongoose.Schema({
    user: userSchema,
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
    },
    location: {
      type: String,
      required: true,
    },
    reqstd_no_of_medicine: {
      type: Number,
      required: true,
      Min: 1,
      Max: 20,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  })
);

function validateMedicineOrder(request) {
  const schema = Joi.object({
    userId: Joi.objectid().required(),
    medicineId: Joi.objectid().required(),
    location: Joi.string().min(2).required(),
    reqstd_no_of_medicine: Joi.number().min(1).max(20).required(),
  });

  return schema.validate(request);
}

exports.Medicine_order = Medicine_order;
exports.validate = validateMedicineOrder;
