const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const placeNameSchema = new Schema({
    name: {
        type: String,
        default: "",
    },
  });
  
  module.exports = Item = mongoose.model('placeName', placeNameSchema);
  