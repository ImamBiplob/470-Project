const { User } = require('../models/user');
const {Blood_bank} = require('../models/blood-bank');
const {Blood_request, validate} = require('../models/blood-request');
const express = require('express');
const mongoose = require('mongoose');
//const Fawn = require('fawn');
const router = express.Router();

//Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const blood_requests = await Blood_request.find().sort('-date');
    res.send(blood_requests);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send('Invalid User');

    const blood_bank = await Blood_bank.findById(req.body.blood_bankId);
    if (!blood_bank) return res.status(400).send('Invalid Blood Bank');

    const blood_request = new Blood_request({
        user: {
            _id : user._id,
            name: user.name,
            phone: user.phone,
            email: user.email
        },
        blood_bank: req.body.blood_bankId,
        reqstd_bg: req.body.reqstd_bg,
        reqstd_no_of_bags: req.body.reqstd_no_of_bags
    });

    await blood_request.save();

    blood_bank.no_of_bags -= req.body.reqstd_no_of_bags;
    blood_bank.save();

    res.send(blood_request);
    /*try {
        new Fawn.Task()
            .save('blood-requests', blood_request)
            .update('blood-banks', {_id: blood_bank._id}, {
                $inc: { reqstd_no_of_bags: -req.body.reqstd_no_of_bags }
            })
            .run();

        res.send(blood_request);
    }
    catch(ex) {
        res.status(500).send('Something failed in the server.');
    }*/
});

router.delete('/:id', async (req, res) => {
    
    const blood_request = await Blood_request.findByIdAndRemove(req.params.id);

    if(!blood_request) return res.status(404).send('The Blood Request with the given id not found');

    res.send(blood_request);
});

module.exports = router;