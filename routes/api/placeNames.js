const express = require('express');
const router = express.Router();

// Item Model
const placeNames = require('../../models/placeName');

// @route   GET api/placeNames/:placeName
// @desc    search for anything
// @access  Public
router.get('/:placeName', (req, res) => {   //
    try{
      console.log('get place names starting with: ' + req.params.placeName)

      var regexp = new RegExp("^"+ req.params.placeName);
      placeNames.find({
        name: regexp
      })
      .then(place => {
        console.log('got places');
          res.json(place);
      })
    }catch(error){
      console.log('error while getting names');
    }
  });

// @route   POST api/placeNames/create
// @desc    create place name
// @access  Public
router.post('/create', (req, res) => {
    var query = {name: req.body.placeName},
    update = { name: req.body.placeName },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };
  
    placeNames.findOneAndUpdate(query, update, options)
    .then(placeName => res.json(placeName))
    .catch(error => {
        console.error('error while creating place name: ', error);
    })
});

// @route   POST api/placeNames/create
// @desc    get all place names starting with 'placeName'
// @access  Public
router.post('/get', (req, res) => {
  var regexp = new RegExp("^"+ req.body.placeName);

  placeNames.find({ name: regexp})
  .then(
    placeNames => 
    res.json(placeNames)
    )
  .catch(error => {
      console.error('error while creating place name: ', error);
  })
});

module.exports = router;