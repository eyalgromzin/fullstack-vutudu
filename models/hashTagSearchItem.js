const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const hashTagSchema = new Schema({
    firstLetters: {
      type: String,
      required: true,
    },
    hashTag: {
        type: [String],
        required: true,
        default: [],
    },
  });
  
  module.exports = Item = mongoose.model('hashTag', hashTagSchema);
  