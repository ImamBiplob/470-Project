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

const Ambulance = mongoose.model('Ambulance', new mongoose.Schema({
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
    },
    availability: {
        type: Boolean,
        required: true,
        default: true
    }
}));

function validateAmbulance(ambulance) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        cost_per_hour: Joi.number().required(),
        type: Joi.string().required().valid('Basic Ambulance', 'First Responder Ambulance', 'Life Support Ambulance', 'Neonatal Ambulance'),
        driverId: Joi.objectid().required()
    });

    return schema.validate(ambulance);
}

exports.Ambulance = Ambulance;
exports.validate = validateAmbulance;