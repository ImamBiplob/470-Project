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

seatSchema = new mongoose.Schema({
    seat_no: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Ward', 'Twin Bed', 'Single Standard', 'Single Deluxe', 'Suite Room', 'ICU', 'CCU']
    },
    cost: {
        type: Number,
        required: true
    }
});

const Seat_booking = mongoose.model('Seat-booking', new mongoose.Schema({
    user: {
        type: userSchema,
        required: true
    },
    seat: {
        type: seatSchema,
        required: true
    },
    patient_name: {
        type: String,
        required: true
    },
    patient_disease: String,
    patient_age: Number,
    patient_sex: {
        type: String,
        enum: ['Male', 'Female']
    },
    date: {
        type: Date,
        default: Date.now
    }
}));

function validateSeat_booking (request) {
    const schema = Joi.object({
        userId: Joi.objectid().required(),
        seatId: Joi.objectid().required(),
        patient_name: Joi.string().min(2).max(255).required(),
        patient_disease: Joi.string(),
        patient_age: Joi.number(),
        patient_sex: Joi.string().valid('Male', 'Female'),
    });

    return schema.validate(request);
}

exports.Seat_booking = Seat_booking;
exports.validate = validateSeat_booking;