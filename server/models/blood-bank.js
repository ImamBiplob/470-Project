const Joi = require('joi');
const mongoose = require('mongoose');

const Blood_bank = mongoose.model('Blood-bank', new mongoose.Schema({
    blood_group: {
        type: String,
        required: true,
        enum: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-',  'O-']
    },
    no_of_bags: {
        type: Number,
        //required: true
    },
    date: { type: Date, default: Date.now }
}));

function validateBlood_bank(bank) {
    const schema = Joi.object({
        blood_group: Joi.string().min(2).required().valid('A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-',  'O-'),
        no_of_bags: Joi.number().min(1)
    });

    return schema.validate(bank);
}

exports.Blood_bank = Blood_bank;
exports.validate = validateBlood_bank;