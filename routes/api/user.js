//user

const express = require('express');
const router = express.Router();

// user Model
const User = require('../../models/user');
// // Item Model
// const Item = require('../../models/Item');

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
  
  // console.log("creating user:");
  // console.log("firstName: " + req.body.firstName);
  // console.log("lastName: " + req.body.lastName);
  // console.log("id: " + req.body.id);

  // const newUser = new User({
  //   firstName: req.body.firstName,     
  //   lastName: req.body.lastName,
  //   id: req.body.id,
  // })

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
    var x=5;
    x++;
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
  console.log("added idea to user: " + req.body.userID);
  
  //update the created idea of the  user that created the idea - add to like array the user id that liked it.
  User.findOneAndUpdate({ id: req.body.idea.createdBy, "created._id": req.body.idea._id},
    { "$push": { "created.$.liked": req.body.userID }})
  .then(users => res.json(users));
  console.log("added user id to the liked idea in the created user: " + req.body.userID);
});

// @route   POST api/user/removeUserLiked/
// @desc    search for anything
// @access  Public
router.post('/removeUserLiked', (req, res) => {   //works
  console.log("updating " + req.body.userID);
  User.findOneAndUpdate({ id: req.body.userID },
    { "$pull": { "liked": {"_id": req.body.idea._id }}})
  .then(users => res.json(users));
  console.log("added idea to user: " + req.body.userID);
  
  //update the idea thats in the user that created the idea.
  User.findOneAndUpdate({ id: req.body.idea.createdBy, "created._id": req.body.idea._id},
    { "$pull": { "created.$.liked": req.body.userID }})
  .then(users => res.json(users));
  console.log("removed userID to the liked idea in the created user: " + req.body.userID);
});

// @route   POST api/user/userLiked/
// @desc    search for anything
// @access  Public
router.post('/userAddedHard', (req, res) => {   //works
  console.log("updating " + req.body.userID);
  //update the created idea of the  user that created the idea - add to like array the user id that liked it.
  User.findOneAndUpdate({ id: req.body.idea.createdBy, "created._id": req.body.idea._id},
    { "$push": { "created.$.addedHard": req.body.userID }})
  .then(users => res.json(users));
  console.log("added user id to the liked idea in the created user: " + req.body.userID);
});

// @route   POST api/user/userLiked/
// @desc    search for anything
// @access  Public
router.post('/userDisliked', (req, res) => {   //works
  //update the created idea of the  user that created the idea - add to dislike array the user id that disliked it.
  User.findOneAndUpdate({ id: req.body.idea.createdBy, "created._id": req.body.idea._id},
    { "$push": { "created.$.disliked": req.body.userID }})
  .then(users => res.json(users));
  console.log("added user id to the liked idea in the created user: " + req.body.userID);
});

// @route   POST api/user/userLiked/
// @desc    search for anything
// @access  Public
router.post('/removeUserDisliked', (req, res) => {   //works
  //update the created idea of the  user that created the idea - add to dislike array the user id that disliked it.
  User.findOneAndUpdate({ id: req.body.idea.createdBy, "created._id": req.body.idea._id},
    { "$pull": { "created.$.disliked": req.body.userID }})
  .then(users => res.json(users));
  console.log("removed user id from  the disliked idea in the created user: " + req.body.userID);
});

// @route   POST api/user/userLiked/
// @desc    search for anything
// @access  Public
router.post('/addHardToIdeaCreator', (req, res) => {   //works
  //update the created idea of the  user that created the idea - add to like array the user id that liked it.
  User.findOneAndUpdate({ id: req.body.idea.createdBy, "created._id": req.body.idea._id},
    { "$push": { "created.$.hard": req.body.userID }})
  .then(users => res.json(users));
  console.log("added user id to the idea of the creator. userID: " + req.body.userID);
});

// @route   POST api/user/userLiked/
// @desc    search for anything
// @access  Public
router.post('/removeHardFromIdeaCreator', (req, res) => {   //works
  //update the created idea of the  user that created the idea - add to like array the user id that liked it.
  User.findOneAndUpdate({ id: req.body.idea.createdBy, "created._id": req.body.idea._id},
    { "$pull": { "created.$.hard": req.body.userID }})
  .then(users => res.json(users));
  console.log("added user id to the idea of the creator. userID: " + req.body.userID);
});

// @route   POST api/user/userLiked/
// @desc    search for anything
// @access  Public
router.post('/addEasyToIdeaCreator', (req, res) => {   //works
  //update the created idea of the  user that created the idea - add to like array the user id that liked it.
  User.findOneAndUpdate({ id: req.body.idea.createdBy, "created._id": req.body.idea._id},
    { "$push": { "created.$.easy": req.body.userID }})
  .then(users => res.json(users));
  console.log("added user id to the idea of the creator. userID: " + req.body.userID);
});

// @route   POST api/user/userLiked/
// @desc    search for anything
// @access  Public
router.post('/removeEasyFromIdeaCreator', (req, res) => {   //works
  //update the created idea of the  user that created the idea - add to like array the user id that liked it.
  User.findOneAndUpdate({ id: req.body.idea.createdBy, "created._id": req.body.idea._id},
    { "$pull": { "created.$.easy": req.body.userID }})
  .then(users => res.json(users));
  console.log("added user id to the idea of the creator. userID: " + req.body.userID);
});

// @route   POST api/user/userLiked/
// @desc    search for anything
// @access  Public
router.post('/addTimePlusToIdeaCreator', (req, res) => {   //works
  //update the created idea of the  user that created the idea - add to like array the user id that liked it.
  User.findOneAndUpdate({ id: req.body.idea.createdBy, "created._id": req.body.idea._id},
    { "$push": { "created.$.addedLong": req.body.userID }})
  .then(users => res.json(users));
  console.log("added user id to time plus of the idea of the creator. userID: " + req.body.userID);
});

// @route   POST api/user/userLiked/
// @desc    search for anything
// @access  Public
router.post('/removeTimePlusFromIdeaCreator', (req, res) => {   //works
  //update the created idea of the  user that created the idea - add to like array the user id that liked it.
  User.findOneAndUpdate({ id: req.body.idea.createdBy, "created._id": req.body.idea._id},
    { "$pull": { "created.$.addedLong": req.body.userID }})
  .then(users => res.json(users));
  console.log("removed user id to time plus of the idea of the creator. userID: " + req.body.userID);
});

// @route   POST api/user/userLiked/
// @desc    search for anything
// @access  Public
router.post('/addTimeMinusToIdeaCreator', (req, res) => {   //works
  //update the created idea of the  user that created the idea - add to like array the user id that liked it.
  User.findOneAndUpdate({ id: req.body.idea.createdBy, "created._id": req.body.idea._id},
    { "$push": { "created.$.addedShort": req.body.userID }})
  .then(users => res.json(users));
  console.log("added user id to time minus of the idea of the creator. userID: " + req.body.userID);
});

// @route   POST api/user/userLiked/
// @desc    search for anything
// @access  Public
router.post('/removeTimeMinusFromIdeaCreator', (req, res) => {   //works
  //update the created idea of the user that created the idea - add to like array the user id that liked it.
  User.findOneAndUpdate({ id: req.body.idea.createdBy, "created._id": req.body.idea._id},
    { "$pull": { "created.$.addedShort": req.body.userID }})
  .then(users => res.json(users));
  console.log("removed user id to time minus of the idea of the creator. userID: " + req.body.userID);
});

// @route   POST api/user/updateUserCreatedIdea/
// @get userID, ideaID, title, content
// @desc    update idea in user 
// @access  Public
router.post('/updateUserCreatedIdea', (req, res) => {   //works
  console.log("updating " + req.body.userID);
  User.findOneAndUpdate({ id: req.body.userID, "created._id": req.body.ideaID},
    { "$set": { "created.$.title": req.body.title, "created.$.content": req.body.content }})
  .then(users => res.json(users));
  console.log("updated " + req.body.userID);
});

// @route   POST api/user/addUserToUserLikedIdea/
// @get userID, ideaID, title, content
// @desc    update idea in user 
// @access  Public
router.post('/addUserToUserLikedIdea', (req, res) => {   //works
  console.log("adding user: " + req.body.userIDToAdd + ", to idea: " + req.body.ideaID + ", in user: " + req.body.userIDToUpdate);
  User.findOneAndUpdate({ id: req.body.userID, "liked._id": req.body.ideaID},
    { "$push": { "liked.$.liked": req.body.userIDToAdd }})
  .then(users => res.json(users));
  console.log("updated " + req.body.userID);
});

// // @route   POST api/user/userDone/
// // @desc    search for anything
// // @access  Public
// router.post('/userDone', (req, res) => {   //works
//   console.log("updating " + req.body.userID);
//   User.findOneAndUpdate({ id: req.body.userID },
//     { "$push": { "done": req.body.ideaID } })
//   .then(users => res.json(users));
//   console.log("updated " + req.body.userID);
// });

// @route   POST api/user/userCreated/
// @desc    addIdeaToUserCreatedIdeas
// @access  Public
router.post('/addIdeaToUserCreatedIdeas', (req, res) => {   //works
  console.log("updating: " + req.body.userID);
  User.findOneAndUpdate({ id: req.body.userID },
    { "$push": { "created": req.body.idea } })
  .then(users => res.json(users));
  console.log("updated: " + req.body.userID);
});

// @route   POST api/user/userCreated/
// @desc    add Idea To User Created Ideas
// @access  Public
router.post('/addIdeaToUserCreatedIdeas', (req, res) => {   //works
  console.log("updating: " + req.body.userID);
  User.findOneAndUpdate({ id: req.body.userID },
    { "$push": { "created._id": { "_id": req.body.idea.id } } })
  .then(users => res.json(users));
  console.log("updated: " + req.body.userID);
});

// @route   POST api/user/getUser/
// @desc    search for anything
// @access  Public
router.post('/getUser', (req, res) => {   //works
  console.log("getting user: " + req.body.userID);
  User.find({ id: req.body.userID })
    .then(users => {
      res.json(users);
      console.log("got user");
    });
});

// @route   POST api/user/getUser/
// @desc    search for anything
// @access  Public
router.post('/deleteCreatedIdea', (req, res) => {   //works
  console.log("removing created idea: " + req.body.userID + " from user: " + req.body.ideaID);
  User.findOneAndUpdate(
    { id: req.body.userID },
    { "$pull" : { created: { _id: req.body.ideaID } } },
    { new: true }
  )
  .then(user => {
    res.json(user);
    console.log("removed created idea from user");
  })
  .catch(error => {
    console.error('error during delete created idea: ', error);
  })

  

});



module.exports = router;
