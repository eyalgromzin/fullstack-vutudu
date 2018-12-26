const express = require('express');
const router = express.Router();
// const ObjectId = require('mongodb').ObjectID;
// const db = require('mongodb')
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
    time: req.body.idea.time,
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

  Item.findOneAndUpdate( {_id: ideaID},     
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
    { "$pull": { "disliked": req.body.userID } },
    {new: true})
  .then(
    items => res.json(items)
  );  
});

// @route   POST api/items/addHardToIdea/
// @desc    search for anything
// @access  Public
router.post('/addHardToIdea/', (req, res) => {   
  var ideaID = req.body.idea._id;
  console.log("addHardToIdea: updating idea" + ideaID);
  console.log("ideaID: " + ideaID + ", userID: " + req.body.userID)

  Item.findOneAndUpdate({ _id: ideaID },
    { "$push": { "addedHard": req.body.userID },
      "$inc" : { "hardCount": 1 } } 
  )
  .then(items => res.json(items));
  console.log("updated idea hard " + ideaID);
});

// @route   POST api/items/removeHardFromIdea/
// @desc    search for anything
// @access  Public
router.post('/removeHardFromIdea/', (req, res) => {   
  var ideaID = req.body.idea._id;
  console.log("removeHardFromIdea: updating idea" + ideaID);
  console.log("ideaID: " + ideaID + ", userID: " + req.body.userID)

  Item.findOneAndUpdate({ _id: ideaID },
    { "$pull": { "addedHard": req.body.userID },
    "$inc" : { "hardCount": -1 } })
  .then(items => res.json(items));
  console.log("updated idea hard " + ideaID);
});

// @route   POST api/items/removeHardFromIdea/
// @desc    search for anything
// @access  Public
router.post('/removeEasyFromIdea/', (req, res) => {   
  var ideaID = req.body.idea._id;
  console.log("removeEasyFromIdea: updating idea" + ideaID);
  console.log("ideaID: " + ideaID + ", userID: " + req.body.userID)

  Item.findOneAndUpdate({ _id: ideaID },
    { "$pull": { "addedEasy": req.body.userID } })
  .then(items => res.json(items));
  console.log("updated idea easy " + ideaID);
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

// @route   POST api/items/addLongToIdea/
// @desc    search for anything
// @access  Public
router.post('/removeLongFromIdea/', (req, res) => {   
  var ideaID = req.body.idea._id;
  console.log("removedLongFromIdea: updating idea" + ideaID);
  console.log("userID: " + req.body.userID)
  Item.findOneAndUpdate({ _id: ideaID },
    { "$pull": { "addedLong": req.body.userID } })
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

// @route   POST api/items/addedShortToIDea/
// @desc    search for anything
// @access  Public
router.post('/removeShortFromIDea/', (req, res) => {   
  var ideaID = req.body.idea._id;
  console.log("removed Short from Idea: " + ideaID);
  console.log("userID: " + req.body.userID)

  Item.findOneAndUpdate({ _id: req.body.idea._id },
    { "$pull": { "addedShort": req.body.userID } })
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
      {time: req.params.time},
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
    time: req.params.time,
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

// @route   POST api/items/deleteIdea/
// @desc    update idea 
// @access  Public
router.post('/deleteIdea/', (req, res) => {   
  console.log("in items router: deleting idea: " + req.body.ideaID);
  Item.findById( req.body.ideaID ) 
  .then(item => item.remove().then(() => res.json({ success: true })))
});

// @route   POST api/items/updateIdeaBasic/
// @desc    update idea 
// @access  Public
router.post('/updateIdeaBasic/', (req, res) => {   
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

// @route   POST api/items/updateIdeaBasic/
// @desc    update idea 
// @access  Public
router.post('/getTopIdeas/', (req, res) => {   
  console.log("getting top ideas");
  item.find().sort({viewCount: -1}).limit(5).exec( 
    function(err, projects) {
        ...
    }
  .then( 
    items => {
      console.log("updated idea: " + req.body.ideaID);
      return res.json(items);
    }
  );
});

// @route   POST api/items/updateIdeaBasic/
// @desc    update idea 
// @access  Public
router.post('/updateTopIdeasView/', (req, res) => {   
  console.log("updating top ideas view");
  item.findOne()
  .then( 
    items => {
      console.log("updated idea: " + req.body.ideaID);
      return res.json(items);
    }
  );
});

// @route   POST api/items/updateIdeaAllFields/
// @desc    update idea 
// @access  Public
router.post('/updateIdeaAllFields/', (req, res) => {   
  console.log("updating idea: " + req.body.ideaID);
  console.log("new title: " + req.body.title);
  console.log("new content: " + req.body.content);
  console.log("new place: " + req.body.place);
  console.log("new time: " + req.body.time);
  console.log("new minNumOfPeople: " + req.body.minNumOfPeople);
  console.log("new maxNumOfPeople: " + req.body.maxNumOfPeople);
  Item.findOneAndUpdate({ _id: req.body.ideaID }, 
    {$set: 
      {
        title: req.body.title, 
        content: req.body.content, 
        tags: req.body.tags, 
        place: req.body.place, 
        time: req.body.time, 
        minNumOfPeople: req.body.minNumOfPeople, 
        maxNumOfPeople: req.body.maxNumOfPeople, 
    }}, 
    {new: true})
  .then( 
    items => {
      console.log("updated idea: " + req.body.ideaID);
      return res.json(items);
    }
  );
});

module.exports = router;
