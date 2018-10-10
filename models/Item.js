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
  },
  maxTime: {
    type: Number,
    required: false,
  },
  minNumOfPeople: {
    type: Number,
    required: false,
  },
  maxNumOfPeople: {
    type: Number,
    required: false,
  },
  liked: {
    type: Array,
    required: false,
    default: [],
  },
  disliked: {
    type: Array,
    required: false,
    default: [],
  },
  addedEasy: {
    type: Array,
    required: false,
    default: [],
  },
  addedHard: {
    type: Array,
    required: false,
    default: [],
  },
  addedShort: {
    type: Array,
    required: false,
    default: [],
  },
  addedLong: {
    type: Array,
    required: false,
    default: [],
  },
});

module.exports = Item = mongoose.model('item', ItemSchema);
