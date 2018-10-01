// import { CHANGE_LOGGED_IN_STATE } from '../../client/src/reducers/commonReducer';

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
    Item.find({
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

// @route   POST api/items
// @desc    Create An Item
// @access  Public
//for first log in - upsert
router.post('/create/', (req, res) => {
  
  console.log(req.body.firstName);
  console.log(req.body.lastName);

  const newUser = new User({
    firstName: req.body.firstName,     
    lastName: req.body.lastName
  })

  newUser.save()
  .then(
    newUser => res.json(newUser)
  )
  .catch(function(error){
      console.log(error);
    });
});

// // @route   POST api/items
// // @desc    Create An Item
// // @access  Public
// //for first log in - upsert
// router.post('/createUser/', (req, res) => {
//   const newUser = new User({
//     firstName: req.body.firstName,    //id: 
//     lastName: req.body.lastName
//   })

//   newUser.save().then(item=> res.json(item));
// });

module.exports = router;











// // @route   POST api/items
// // @desc    Create An Item
// // @access  Public
// //for first log in - upsert
// router.post('/', (req, res) => {
//     const newUser = new User({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//     })

//     newUser.save().then(item=> res.json(item));
// });

// // update liked ideas
// // @route   POST api/items
// // @desc    Create An Item
// // @access  Public
// //for first log in - upsert
// //use push to update array
// router.post('/likeIdea', (req, res) => {
//   User.findByIdAndUpdate(req.body.id,
//     { "$push": { "liked": req.body.likedIdeaID } },
//     { "new": true, "upsert": true }
//   ).then(item => res.json(item));
// });

// // @route   POST api/items
// // @desc    Create An Item
// // @access  Public
// //for first log in - upsert
// router.post('/login/', (req, res) => {
//   const newUser = new User({
//     id: req.body.id,
//   })

//   newUser.save().then(item=> res.json(item));
// });

// // update liked ideas
// // @route   POST api/items
// // @desc    Create An Item
// // @access  Public
// //new - The new: true option changes what is returned in the callback function. If it is false, doc will contain the document before updating (or null before inserting). If it is true, doc contains the document after updating or creating. While false is the default option, I guess most people would actually prefer it to be true.
// //for first log in - upsert
// //use push to update array
// router.post('/createUserInDB', (req, res) => {
//   User.findByIdAndUpdate(req.body.id,
//     ,
//     { "new": true, "upsert": true }
//   ).then(item => res.json(item));
// });

// // update liked ideas
// // @route   POST api/items
// // @desc    Create An Item
// // @access  Public
// //new - The new: true option changes what is returned in the callback function. If it is false, doc will contain the document before updating (or null before inserting). If it is true, doc contains the document after updating or creating. While false is the default option, I guess most people would actually prefer it to be true.
// //for first log in - upsert
// //use push to update array
// router.post('/createUserInDB', (req, res) => {
//   User.findByIdAndUpdate(req.body.id,
//     ,
//     { "new": true, "upsert": true }
//   ).then(item => res.json(item));
// });

