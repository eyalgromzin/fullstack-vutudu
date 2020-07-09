const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// _id: {
//   type: Number,
//   default: 0
// },

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
  createdIn: {
    type: String,
    required: true,
    default: undefined
  },
  createdOn: {
    type: Number,
    required: true,
    default: 0
  },
  subjects: {
    type: [String],
    required: true,
    default: [],
  },
  places: {
    type: [String],
    required: true,
    default: [],
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
    type: [String],
    required: false,
    default: [],
  },
  disliked: {
    type: [String],
    required: false,
    default: [],
  },
});

module.exports = Item = mongoose.model('item', ItemSchema);
