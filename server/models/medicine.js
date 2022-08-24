const Joi = require('joi');
const mongoose = require('mongoose');

const Medicine = mongoose.model('Medicine', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    }
}));

function validateMedicine(medicine) {
    const schema = Joi.object({
        name: Joi.string().required(),
        stock: Joi.number().required(),
        price: Joi.number().required()
    });

    return schema.validate(medicine);
}

exports.Medicine = Medicine;
exports.validate = validateMedicine;