const Joi = require('joi');
const mongoose = require('mongoose');

userSchema = new mongoose.Schema({
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
    email: String
});

const Blood_request = mongoose.model('Blood-request', new mongoose.Schema({
    user: userSchema,
    blood_bank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blood_bank'
    },
    reqstd_bg: {
        type: String,
        required: true,
        enum: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-',  'O-']
    },
    reqstd_no_of_bags: {
        type: Number,
        required: true,
        Min: 1,
        Max: 20
    },
    date: {
        type: Date,
        default: Date.now
    }
}));

function validateBlood_request (request) {
    const schema = Joi.object({
        userId: Joi.objectid().required(),
        blood_bankId: Joi.objectid().required(),
        reqstd_bg: Joi.string().min(2).required().valid('A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'),
        reqstd_no_of_bags: Joi.number().min(1).max(20).required()
    });

    return schema.validate(request);
}

exports.Blood_request = Blood_request;
exports.validate = validateBlood_request;