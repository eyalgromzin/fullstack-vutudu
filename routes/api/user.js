const express = require('express');
const router = express.Router();

// user Model
const User = require('../../models/user');

// @route   GET api/user/:id
// @desc    search for anything
// @access  Public
router.get('/:userID', (req, res) => {   //
  try{
    console.log('get request req.params.userID: ' + req.params.userID)
    User.find({
      id: req.params.userID
    })
    .then(user => {
        console.log('in response of get user');
        res.json(user);
    })
  }catch(error){
    console.log('error while getting user');
  }
});

// @route   POST api/user/create
// @desc    Create An Item
// @access  Public
//for first log in - upsert
router.post('/create', (req, res) => {
  
  console.log(req.body.firstName);
  console.log(req.body.lastName);
  console.log(req.body.id);

  const newUser = new User({
    firstName: req.body.firstName,     
    lastName: req.body.lastName,
    id: req.body.id
  })

  newUser.save()
  .then(
    newUser => res.json(newUser)
  )
  .catch(function(error){
      console.log(error);
    });
});

// @route   POST api/user/userLiked/
// @desc    search for anything
// @access  Public
router.post('/userLiked', (req, res) => {   //works
  console.log("updating " + req.body.userID);
  User.findOneAndUpdate({ id: req.body.userID },
    { "$push": { "liked": req.body.idea } })
  .then(users => res.json(users));
  console.log("updated " + req.body.userID);
});

// @route   POST api/user/userDone/
// @desc    search for anything
// @access  Public
router.post('/userDone', (req, res) => {   //works
  console.log("updating " + req.body.userID);
  User.findOneAndUpdate({ id: req.body.userID },
    { "$push": { "done": req.body.ideaID } })
  .then(users => res.json(users));
  console.log("updated " + req.body.userID);
});

// @route   POST api/user/userCreated/
// @desc    search for anything
// @access  Public
router.post('/addIdeaToUserCreatedIdeas', (req, res) => {   //works
  console.log("updating: " + req.body.userID);
  User.findOneAndUpdate({ id: req.body.userID },
    { "$push": { "created": req.body.ideaID } })
  .then(users => res.json(users));
  console.log("updated: " + req.body.userID);
});



module.exports = router;
