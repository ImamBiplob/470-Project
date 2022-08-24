const { User } = require('../models/user');
const { Seat } = require('../models/seat');
const { Seat_booking, validate } = require('../models/seat-booking');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', async (req, res) => {
    const seat_bookings = await Seat_booking.find().sort('-date');
    res.send(seat_bookings);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('Invalid User');

    const seat = await Seat.findById(req.body.seatId);
    if (!seat) return res.status(400).send('Invalid Seat');

    const seat_booking = new Seat_booking({
        user: user,
        seat: seat,
        patient_name: req.body.patient_name,
        patient_sex: req.body.patient_sex,
        patient_age: req.body.patient_age,
        patient_disease: req.body.patient_disease
    });

    await seat_booking.save();

    seat.availability = false;
    seat.save();

    res.send(seat_booking);
});

router.delete('/:id', async (req, res) => {
    
    const seat_booking = await Seat_booking.findByIdAndRemove(req.params.id);

    if(!seat_booking) return res.status(404).send('The Seat Booking with the given id not found');

    res.send(seat_booking);
});

module.exports = router;