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

// @route   POST api/items
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
    maxNumOfPeople: req.body.idea.maxNumOfPeople
  });

  newItem.save().then(item=> res.json(item));
});

// @route   POST api/items/ideaLiked/
// @desc    search for anything
// @access  Public
router.post('/ideaLiked/', (req, res) => {   
  console.log("updating idea " + req.body.idea._id.$oid);

  var ideaID = req.body.idea._id.$oid;

  Item.findOneAndUpdate( {_id: ideaID},      //{'_id': ObjectID(ideaID)}
    { "$push": { "liked": req.body.userID } },
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
  console.log("updating idea " + req.body.idea._id.$oid);

  var ideaID = req.body.idea._id.$oid;

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
  console.log("updating idea" + req.body.ideaID);
  Item.findOneAndUpdate({ _id: req.body.ideaID },
    { "$push": { "addedHard": req.body.userID } })
  .then(items => res.json(items));
  console.log("updated idea" + req.body.ideaID);
});

// @route   POST api/items/addedEasyToIdea/
// @desc    search for anything
// @access  Public
router.post('/addedEasyToIdea/', (req, res) => {   
  console.log("updating idea" + req.body.ideaID);
  Item.findOneAndUpdate({ _id: req.body.ideaID },
    { "$push": { "addedEasy": req.body.userID } })
  .then(items => res.json(items));
  console.log("updated idea" + req.body.ideaID);
});

// @route   POST api/items/addedLongToIdea/
// @desc    search for anything
// @access  Public
router.post('/addedLongToIdea/', (req, res) => {   
  console.log("updating idea" + req.body.ideaID);
  Item.findOneAndUpdate({ _id: req.body.ideaID },
    { "$push": { "addedLong": req.body.userID } })
  .then(items => res.json(items));
  console.log("updated idea" + req.body.ideaID);
});

// @route   POST api/items/addedShortToIDea/
// @desc    search for anything
// @access  Public
router.post('/addedShortToIDea/', (req, res) => {   
  console.log("updating idea" + req.body.ideaID);
  Item.findOneAndUpdate({ _id: req.body.ideaID },
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
  console.log("updating idea" + req.body.ideaID);
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

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   POST api/user/findLiked/
// @desc    search for anything
// @access  Public
//
//pass user id
//
//find all ideas containing: userID
router.post('/getUserLikedIdeas/', (req, res) => {   
  console.log("getting user liked ideas: " + req.body.userID);
  Item.find({ liked: req.body.userID })
  // Item.find({ liked: { "$in" : [req.body.ideaID]}  })
  .then(
    items => res.json(items)
  );
  console.log("got User Liked Ideas");
});

//find all ideas containing: userID
router.post('/updateIdea/', (req, res) => {   
  console.log("updating idea: " + req.body.ideaID);
  console.log("_id: " + req.body._id);
  console.log("title: " + req.body.title);
  console.log("content: " + req.body.content);
  Item.findOneAndUpdate({ _id: req.body.ideaID }, {$set: {title: req.body.title, content: req.body.content}}, {new: true})
  .then(
    
    items => {
      console.log("updated idea: " + JSON.stringify(items));
      return res.json(items);
    }
    
  );
  // console.log("updated idea: " + req.body.ideaID);
  });

// @route   POST /api/items/updateUserIdeas
// @desc    search for anything
// @access  Public
//
//pass user id
//
//find all ideas containing: userID
router.post('/updateUserIdeas/', (req, res) => {   
  console.log("getting user ideas: " + req.body.userID + ", type: " + req.body.ideaType);

  var query = {};
  query[req.body.ideaType]  = req.body.userID;

  Item.find(query)
  .then(
    items => res.json(items)
  );
  console.log("got User Liked Ideas");
});


/////////////////////// USER API //////////////////////




// // @route   GET api/search/:place/:time/:numOfPeople/:more
// // @desc    search for anything
// // @access  Public
// router.post('/user/liked/:userID/:ideaID', (req, res) => {   
//   var query = {'id':req.params.userID};
//   // req.newData.liked = 
//   Item.findOneAndUpdate(query,req.newData,{upsert:true},function(err,doc){
//   })
//   .then(items => res.json(items));
// });

module.exports = router;
