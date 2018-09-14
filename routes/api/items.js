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

// @route   GET api/search/:place/:time/:numOfPeople/:more
// @desc    search for anything
// @access  Public
router.post('/search/', (req, res) => {
  // Item.find(
  //   {
  //      gte : req.body.minTime,
  //      lte : req.body.maxTime
  // })

var searchQuery = "Item.find({"

if(req.body.place != ""){
  searchQuery += "place: req.body.place,"
}
if(req.body.time != ""){
  searchQuery += "$and:[" + 
    "{minTime: {$lte: req.body.time}}," +
    "{maxTime: {$gte: req.body.time}}" + 
  "],"
}
if(req.body.numOfPeople != ""){
  searchQuery += "$and:["
    "{minNumOfPeople: {$lte: req.body.numOfPeople}},"
    "{maxNumOfPeople: {$gte: req.body.numOfPeople}}" + 
  "]"
}
if(req.body.more != ""){
  searchQuery += "place: req.body.place,"
}

searchQuery += "})";

Item.find({     //works
  // eval("")
  
  // place: req.body.place
  // minTime: 30,
  // $and:[
  //   {minTime: {$lte: req.body.time}},
  //   {maxTime: {$gte: req.body.time}}
  // ],
  // $and:[
  //   {minNumOfPeople: {$lte: req.body.numOfPeople}},
  //   {maxNumOfPeople: {$gte: req.body.numOfPeople}}
  // ]
})
  //doesnt work
  // Item.find({
  //   time: {$gte: req.body.minTime},
  //   time: {$lte: req.body.maxTime},
  // })

  // Item.find().and([{ time: {$gte: req.body.minTime}}, 
  //                   {time: {$lte: req.body.maxTime}}]    //doesnt work

  // Item.find(     //doesnt work
  //   // {"time": {$gte: req.body.minTime, $lte: req.body.maxTime}} //fails
  //   {$and: [
  //     {"time": {$gte: req.body.minTime}},
  //     {"time": {$lte: req.body.maxTime}}]
  //   }
  // )




  // .where('place').equals(req.body.place)
  // .where('time').gte(req.body.minTime).lte(req.body.maxTime) //doesnt work
  .then(items => res.json(items));
  
  // .where('numOfPeople').gte(req.body.minNumOfPeople)
  // .where('numOfPeople').lte(req.body.maxNumOfPeople)
  // .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
  const newItem = new Item({
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
