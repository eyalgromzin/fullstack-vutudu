import { array } from '../client/node_modules/@types/prop-types';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },   
    lastName: {
        type: String,
        required: true,
    },    
    liked: {
        type: array,
        required: false,
        default: []
      },
    created: {
        type: array,
        required: false,
        default: []
      },
    done: {
        type: array,
        required: false,
        default: []
      },

});