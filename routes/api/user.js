const express = require('express');
const router = express.Router();

// user Model
const User = require('../../models/user');

// @route   POST api/items
// @desc    Create An Item
// @access  Public
//for first log in - upsert
router.post('/', (req, res) => {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    })

    newUser.save().then(item=> res.json(item));
});
