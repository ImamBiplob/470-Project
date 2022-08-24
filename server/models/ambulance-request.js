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
    }
});

ambulanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    type: {
        type: String,
        required: true,
        enum: ['Basic Ambulance', 'First Responder Ambulance', 'Life Support Ambulance', 'Neonatal Ambulance']
    },
    cost_per_hour: {
        type: Number,
        required: true
    },
    driver: {
        type: driverSchema,
        required: true
    }
});

const Ambulance_request = mongoose.model('Ambulance-request', new mongoose.Schema({
    user: {
        type: userSchema,
        required: true
    },
    ambulance: {
        type: ambulanceSchema,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}));

function validateAmbulance_request (request) {
    const schema = Joi.object({
        userId: Joi.objectid().required(),
        ambulanceId: Joi.objectid().required(),
        location: Joi.string().required()
    });

    return schema.validate(request);
}

exports.Ambulance_request = Ambulance_request;
exports.validate = validateAmbulance_request;