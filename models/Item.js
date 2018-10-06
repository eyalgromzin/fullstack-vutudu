const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    default: 'title',
  },
  content: {
    type: String,
    required: true,
    default: 'content',
  },
  place: {
    type: String,
    required: false,
    default: 'place',
  },
  minTime: {
    type: Number,
    required: false,
    default: 2,
  },
  maxTime: {
    type: Number,
    required: false,
    default: 2,
  },
  minNumOfPeople: {
    type: Number,
    required: false,
    default: 2,
  },
  maxNumOfPeople: {
    type: Number,
    required: false,
    default: 2,
  },
  liked: {
    type: Array,
    required: false,
    default: [],
  },
  dislikes: {
    type: Number,
    required: false,
    default: 0,
  },
  easyCount: {
    type: Number,
    required: false,
    default: 0,
  },
  hardCount: {
    type: Number,
    required: false,
    default: 0,
  },
});

module.exports = Item = mongoose.model('item', ItemSchema);
