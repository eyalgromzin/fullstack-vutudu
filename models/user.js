const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var item = require('mongoose').model('item').schema;

const userSchema = new Schema({
    firstName: {
      type: String,
      required: true,
    },   
    lastName: {
      type: String,
      required: true,
    },    
    id:{
      type: String,
      required: true
    },
    liked: {
      type: Array,
      required: false,
      // default: [item]  //makes it not work
    },
    created: {
      type: Array,
      required: false,
      // default: [item]
    }    
});

module.exports = User = mongoose.model('user', userSchema);