const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        default: []
      },
    created: {
        type: Array,
        required: false,
        default: []
      },
    done: {
        type: Array,
        required: false,
        default: []
      },
});

module.exports = User = mongoose.model('user', userSchema);