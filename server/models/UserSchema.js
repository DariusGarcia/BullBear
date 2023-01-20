const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: [8, 'Password has to be at least 8 characters.'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model('User', UserSchema)

module.exports = User
