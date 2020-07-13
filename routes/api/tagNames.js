const express = require('express');
const router = express.Router();

// Item Model
const hashTags = require('../../models/hashTagName');

// @route   GET api/subjectNames/:subjectName
// @desc    search for elements with subject name
// @access  Public
router.get('/:subjectName', (req, res) => {   //
    try{
      console.log('get subject names starting with: ' + req.params.subjectName)

      var regexp = new RegExp("^"+ req.params.subjectName); //this doesnt work if you just put it as string
      hashTags.find({
        name: regexp
      })
      .then(subject => {
        console.log('got subject');
          res.json(subject);
      })
    }catch(error){
      console.log('error while getting names');
    }
  });

// @route   POST api/subjectNames/create
// @desc    create subject name
// @access  Public
router.post('/create', (req, res) => {

    req.body.subjectNames.forEach(function(subjectName) {
        var query = {name: subjectName},
        update = { name: subjectName },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
        
        hashTags.findOneAndUpdate(query, update, options)
        .then(subjectName => {
            console.log('added hashsubject: ' + subjectName + ', to db')
            return res.json(subjectName)
            })
        .catch(error => {
            console.error('error while creating subject name: ' + subjectName, error);
        })
    })
    
});

// @route   POST api/subjectNames/get
// @desc    get all place names starting with 'subjectName'
// @access  Public
router.post('/get', (req, res) => {
  var regexp = new RegExp("^"+ req.body.subjectName);

  hashTags.find({ name: regexp})
  .then(
    subjectNames => 
    res.json(subjectNames)
    )
  .catch(error => {
      console.error('error while creating place name: ', error);
  })
});

module.exports = router;