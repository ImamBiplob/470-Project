const Joi = require('joi');
const mongoose = require('mongoose');

const Seat = mongoose.model('Seat', new mongoose.Schema({
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
    },
    availability: {
        type: Boolean,
        default: true
    }
}));

function validateSeat(seat) {
    const schema = Joi.object({
        seat_no: Joi.string().required(),
        type: Joi.string().required().valid('Ward', 'Twin Bed', 'Single Standard', 'Single Deluxe', 'Suite Room', 'ICU', 'CCU'),
        cost: Joi.number().required()
    });

    return schema.validate(seat);
}

exports.Seat = Seat;
exports.validate = validateSeat;