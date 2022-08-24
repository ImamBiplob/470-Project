const Joi = require('joi');
const mongoose = require('mongoose');

driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    phone: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 15
    },
});

const Driver = mongoose.model("Driver", driverSchema);

function validateDriver(driver) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        phone: Joi.string().min(8).max(15).required()
    });

    return schema.validate(driver);
}

exports.Driver = Driver;
exports.validate = validateDriver;