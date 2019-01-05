const express = require('express');
const router = express.Router();

// Item Model
const hashTags = require('../../models/hashTagName');

// @route   GET api/hashTagNames/:tagName
// @desc    search for anything
// @access  Public
router.get('/:tagName', (req, res) => {   //
    try{
      console.log('get tag names starting with: ' + req.params.tagName)

      var regexp = new RegExp("^"+ req.params.tagName);
      hashTags.find({
        name: regexp
      })
      .then(tag => {
        console.log('got tags');
          res.json(tag);
      })
    }catch(error){
      console.log('error while getting names');
    }
  });

// @route   POST api/hashTagNames/create
// @desc    create tag name
// @access  Public
router.post('/create', (req, res) => {
    var query = {name: req.body.tagName},
    update = { name: req.body.tagName },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };
  
    hashTags.findOneAndUpdate(query, update, options)
    .then(tagName => res.json(tagName))
    .catch(error => {
        console.error('error while creating tag name: ', error);
    })
});

module.exports = router;