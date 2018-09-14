const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
  const newItem = new Item({
    // name: req.body.name,
    title: req.body.title,
    content: req.body.content,
    place: req.body.place,
    minTime: req.body.minTime,
    maxTime: req.body.maxTime,
    minNumOfPeople: req.body.minNumOfPeople,
    maxNumOfPeople: req.body.maxNumOfPeople
  });

  //save saves is to the data base
  //uses mongoose
  //how does the save works? how can save be added to any object?
  newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
