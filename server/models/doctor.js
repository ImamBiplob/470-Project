const Joi = require('joi');
const mongoose = require('mongoose');

const Doctor = mongoose.model('Doctor', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    email: String,
    phone: {
        type: String,
        minlength: 9,
        maxlength: 15
    },
    blood_group: {
        type: String,
        enum: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-']
    },
    address: String,
    sitting_time: {
        type: String,
        required: true
    },
    qualifications: {
        type: String,
        required: true
    },
    availability: { type: Boolean, default: true },
    date: { type: Date, default: Date.now }
}));

function validateDoctor(doctor) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email(),
        phone: Joi.string().min(8).max(15),
        blood_group: Joi.string().min(2).valid('A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-',  'O-'),
        address: Joi.string(),
        sitting_time: Joi.string().required(),
        qualifications: Joi.string().required()
    });

    return schema.validate(doctor);
}

exports.Doctor = Doctor;
exports.validate = validateDoctor;