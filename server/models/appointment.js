const Joi = require('joi');
const mongoose = require('mongoose');

doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    sitting_time: {
        type: String,
        required: true
    },
    qualifications: {
        type: String,
        required: true
    }
});

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

const Appointment = mongoose.model('Appointment', new mongoose.Schema({
    user: userSchema,
    doctor: doctorSchema,
    patient_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    patient_sex: {
        type: String,
        enum: ['Male', 'Female']
    },
    patient_age: Number,
    appointment_date: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Denied', 'Approved'],
        default: 'Pending'
    }
}));

function validateAppointment(appointment) {
    const schema = Joi.object({
        userId: Joi.objectid().required(),
        doctorId: Joi.objectid().required(),
        patient_name: Joi.string().min(3).max(255).required(),
        patient_sex: Joi.string().valid('Male', 'Female'),
        patient_age: Joi.number().min(0).max(200),
        appointment_date: Joi.date().required()
    });

    return schema.validate(appointment);
}

exports.Appointment = Appointment;
exports.validate = validateAppointment;