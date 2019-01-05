const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const hashTagNameSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "",
    },
  });
  
  module.exports = Item = mongoose.model('hashTagName', hashTagNameSchema);
  