const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
// const mongoose = require('mongoose');

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

// @route   POST api/items/createIdea
// @desc    Create An Item
// @access  Public
router.post('/createIdea/', (req, res) => {
  const newItem = new Item({
    title: req.body.idea.title,
    content: req.body.idea.content,
    createdBy: req.body.idea.createdBy,
    place: req.body.idea.place,
    minTime: req.body.idea.minTime,
    maxTime: req.body.idea.maxTime,
    minNumOfPeople: req.body.idea.minNumOfPeople,
    maxNumOfPeople: req.body.idea.maxNumOfPeople,
    tags: req.body.idea.tags,
  });

  newItem.save().then(item=> res.json(item));
});

// @route   POST api/items/ideaLiked/
// @desc    search for anything
// @access  Public
router.post('/ideaLiked/', (req, res) => {   
  var ideaID = req.body.idea._id;
  console.log("ideaLiked: updating idea " + ideaID);

  Item.findOneAndUpdate( {_id: ideaID},      //{'_id': ObjectID(ideaID)}
    { "$push": { "liked": req.body.userID } },
    {new: true})
  .then(
    items => res.json(items)
  );
});

// @route   POST api/items/ideaLiked/
// @desc    search for anything
// @access  Public
router.post('/removeIdeaLiked/', (req, res) => {   
  var ideaID = req.body.idea._id;
  console.log("ideaLiked: updating idea " + ideaID);

  Item.findOneAndUpdate( {_id: ideaID},      //{'_id': ObjectID(ideaID)}
    { "$pull": { "liked": req.body.userID } },
    {new: true})
  .then(
    items => res.json(items)
  );
});
 
// @route   POST api/items/ideaDisliked/
// @desc    search for anything
// @access  Public
// doesnt work
router.post('/ideaDisliked/', (req, res) => { 
  console.log("ideaDisliked: updating idea " + req.body.idea._id.toString());

  var ideaID = req.body.idea._id;

  Item.findOneAndUpdate( {_id: ideaID},      //{'_id': ObjectID(ideaID)}
    { "$push": { "disliked": req.body.userID } },
    {new: true})
  .then(
    items => res.json(items)
  );  
});

// @route   POST api/items/ideaDisliked/
// @desc    search for anything
// @access  Public
// doesnt work
router.post('/removeIdeaDisliked/', (req, res) => { 
  console.log("ideaDisliked: updating idea " + req.body.idea._id.toString());

  var ideaID = req.body.idea._id;

  Item.findOneAndUpdate( {_id: ideaID},      //{'_id': ObjectID(ideaID)}
    { "$push": { "disliked": req.body.userID } },
    {new: true})
  .then(
    items => res.json(items)
  );  
});

// @route   POST api/items/addedHardToIdea/
// @desc    search for anything
// @access  Public
router.post('/addedHardToIdea/', (req, res) => {   
  var ideaID = req.body.idea._id;
  console.log("addedHardToIdea: updating idea" + ideaID);
  console.log("ideaID: " + ideaID + ", userID: " + req.body.userID)

  Item.findOneAndUpdate({ _id: ideaID },
    { "$push": { "addedHard": req.body.userID } })
  .then(items => res.json(items));
  console.log("updated idea hard " + ideaID);
});

// @route   POST api/items/addedEasyToIdea/
// @desc    search for anything
// @access  Public
router.post('/addedEasyToIdea/', (req, res) => {   
  var ideaID = req.body.idea._id;
  console.log("addedEasyToIdea: updating idea" + ideaID);
  console.log("ideaID: " + ideaID + ", userID: " + req.body.userID)

  Item.findOneAndUpdate({ _id: ideaID },
    { "$push": { "addedEasy": req.body.userID } })
  .then(items => res.json(items));
  console.log("updated idea easy " + ideaID);
});

// @route   POST api/items/addLongToIdea/
// @desc    search for anything
// @access  Public
router.post('/addLongToIdea/', (req, res) => {   
  var ideaID = req.body.idea._id;
  console.log("addedLongToIdea: updating idea" + ideaID);
  console.log("ideaID: " + ideaID + ", userID: " + req.body.userID)
  Item.findOneAndUpdate({ _id: ideaID },
    { "$push": { "addedLong": req.body.userID } })
  .then(items => res.json(items));
  console.log("updated idea" + req.body.ideaID);
});

// @route   POST api/items/addedShortToIDea/
// @desc    search for anything
// @access  Public
router.post('/addShortToIDea/', (req, res) => {   
  var ideaID = req.body.idea._id;
  console.log("addedShortToIdea: updating idea" + ideaID);
  console.log("ideaID: " + ideaID + ", userID: " + req.body.userID)

  Item.findOneAndUpdate({ _id: req.body.idea._id },
    { "$push": { "addedShort": req.body.userID } })
  .then(items => res.json(items));
  console.log("updated idea" + req.body.ideaID);
});

// @route   GET api/search/:place/:time/:numOfPeople/:more
// @desc    search for anything
// @access  Public
router.get('/search/:place/:time/:numOfPeople', (req, res) => {   //
  Item.find({
    $and:[
      {place: req.params.place},
      {$and:[
        {minTime: {$lte: req.params.time}},
        {maxTime: {$gte: req.params.time}}
      ]},
      {$and:[
        {minNumOfPeople: {$lte: req.params.numOfPeople}},
        {maxNumOfPeople: {$gte: req.params.numOfPeople}}
      ]}
    ]
  })
  .then(items => res.json(items));
});

// @route   GET api/search/:place/:time/:numOfPeople/:more
// @desc    search for anything
// @access  Public
router.get('/search/:place/:time/:numOfPeople/:more', (req, res) => {   //
  Item.find({
    place: req.params.place,
    $and:[
      {minTime: {$lte: req.params.time}},
      {maxTime: {$gte: req.params.time}}
    ],
    $and:[
      {minNumOfPeople: {$lte: req.params.numOfPeople}},
      {maxNumOfPeople: {$gte: req.params.numOfPeople}}
    ]
    // more: req.params.more
  })
  .then(items => res.json(items));
});

// @route   POST api/items/search/:place/:time/:numOfPeople/:more
// @desc    search for anything
// @access  Public
router.post('/search/', (req, res) => {
  Item.find({     //works
    // place: req.body.place
    // minTime: 30,
    // $and:[
    //   {minTime: {$lte: req.body.time}},
    //   {maxTime: {$gte: req.body.time}}
    // ],
    $and:[
      {minNumOfPeople: {$lte: req.body.time}},
      {maxNumOfPeople: {$gte: req.body.time}}
    ]
  })
  .then(items => res.json(items));
});

// @route   POST api/items/addedHardToIdea/
// @desc    search for anything
// @access  Public
router.post('/addIdeaToUserCreatedIdeas/', (req, res) => {   
  console.log("addIdeaToUserCreatedIdeas: updating idea" + req.body.ideaID);
  Item.findOneAndUpdate({ _id: req.body.ideaID },
    { "$push": { "addedHard": req.body.userID } })
  .then(items => res.json(items));
  console.log("updated idea" + req.body.ideaID);
});

//duplicate
// // @route   POST api/items
// // @desc    Create An Item
// // @access  Public
// router.post('/', (req, res) => {
//   const newItem = new Item({
//     title: req.body.title,
//     content: req.body.content,
//     place: req.body.place,
//     minTime: req.body.minTime,
//     maxTime: req.body.maxTime,
//     minNumOfPeople: req.body.minNumOfPeople,
//     maxNumOfPeople: req.body.maxNumOfPeople
//   });

  //save saves is to the data base
  //uses mongoose
  //how does the save works? how can save be added to any object?
//   newItem.save().then(item => res.json(item));
// });

// // @route   DELETE api/items/:id
// // @desc    Delete A Item
// // @access  Public
// router.post('/delete/', (req, res) => {
//   console.log("deleting idea: " + req.body.ideaID);
//   Item.findById(req.body.ideaID)
//     .then(item => item.remove().then(() => res.json({ success: true })))
//     .catch(err => res.status(404).json({ success: false }));
//   console.log("deleted idea: " + req.params.id);
// });

// @route   POST api/items/updateIdea/
// @desc    update idea 
// @access  Public
router.post('/deleteIdea/', (req, res) => {   
  console.log("in items router: deleting idea: " + req.body.ideaID);
  Item.findById( req.body.ideaID ) 
  .then(item => item.remove().then(() => res.json({ success: true })))
});

// @route   POST api/items/updateIdea/
// @desc    update idea 
// @access  Public
router.post('/updateIdea/', (req, res) => {   
  console.log("updating idea: " + req.body.ideaID);
  console.log("new title: " + req.body.title);
  console.log("new content: " + req.body.content);
  Item.findOneAndUpdate({ _id: req.body.ideaID }, 
    {$set: {title: req.body.title, content: req.body.content, tags: req.body.tags}}, {new: true})
  .then( 
    items => {
      console.log("updated idea: " + req.body.ideaID);
      return res.json(items);
    }
  );
});

module.exports = router;
