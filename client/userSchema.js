const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'eyalgromzin@gmail.com']
  },
  created: {
    type: Date,
    required: [true, 'Created date is required']
  }
})

module.exports = userSchema