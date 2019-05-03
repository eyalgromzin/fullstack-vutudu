const express = require('express');
const router = express.Router();

// Item Model
const hashTags = require('../../models/hashTagName');

// @route   GET api/hashTagNames/:tagName
// @desc    search for elements with tag name
// @access  Public
router.get('/:tagName', (req, res) => {   //
    try{
      console.log('get tag names starting with: ' + req.params.tagName)

      var regexp = new RegExp("^"+ req.params.tagName); //this doesnt work if you just put it as string
      hashTags.find({
        name: regexp
      })
      .then(tag => {
        console.log('got tag');
          res.json(tag);
      })
    }catch(error){
      console.log('error while getting names');
    }
  });

// @route   POST api/tagNames/create
// @desc    create tag name
// @access  Public
router.post('/create', (req, res) => {

    req.body.tagNames.forEach(function(tagName) {
        var query = {name: tagName},
        update = { name: tagName },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
        
        hashTags.findOneAndUpdate(query, update, options)
        .then(tagName => {
            console.log('added hashtag: ' + tagName + ', to db')
            return res.json(tagName)
            })
        .catch(error => {
            console.error('error while creating tag name: ' + tagName, error);
        })
    })
    
});

// @route   POST api/tagNames/get
// @desc    get all place names starting with 'tagName'
// @access  Public
router.post('/get', (req, res) => {
  var regexp = new RegExp("^"+ req.body.tagName);

  hashTags.find({ name: regexp})
  .then(
    tagNames => 
    res.json(tagNames)
    )
  .catch(error => {
      console.error('error while creating place name: ', error);
  })
});

module.exports = router;