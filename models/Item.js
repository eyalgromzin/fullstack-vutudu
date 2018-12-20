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
  createdBy: {
    type: String,
    required: true,
    default: 'john doe'
  },
  tags: {
    type: [String],
    required: false,
    default: [],
  },
  place: {
    type: String,
    required: false,
    default: 'place',
  },
  time: {
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
    type: [String],
    required: false,
    default: [],
  },
  disliked: {
    type: [String],
    required: false,
    default: [],
  },
  addedEasy: {
    type: [String],
    required: false,
    default: [],
  },
  addedHard: {
    type: [String],
    required: false,
    default: [],
  },
  addedShort: {
    type: [String],
    required: false,
    default: [],
  },
  addedLong: {
    type: [String],
    required: false,
    default: [],
  },
});

module.exports = Item = mongoose.model('item', ItemSchema);
