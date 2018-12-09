const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var item = require('mongoose').model('item').schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        default: 'firstName'
    },   
    lastName: {
        type: String,
        required: true,
        default: 'lastName'
    },    
    id:{
        type: String,
        required: true,
    },
    liked: {
        type: Array,
        required: false,
        default: [item]
      },
    created: {
        type: Array,
        required: false,
        default: [item]
      },
    done: {
        type: Array,
        required: false,
        default: []
      },
});

module.exports = User = mongoose.model('user', userSchema);