const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: [8, 'Password has to be at least 8 characters.'],
  },
})

// static signup method
userSchema.statics.signup = async function (username, password) {
  // validation of username and password
  if (!username || !password) {
    throw new Error('Please provide both username and password.')
  }
  // check if username already exists
  const exists = await this.findOne({ username })
  if (exists) {
    throw Error('username already exists')
  }
  // hashing the password using bcrypt hashing algorithm
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const user = await this.create({ username, password: hash })
  return user
}

// static login method
userSchema.statics.login = async function (username, password) {
  // validation of username and password
  if (!username || !password) {
    throw Error('All fields must be filled')
  }
  const user = await this.findOne({ username })
  if (!user) {
    throw Error('Invalid login credentials: incorrect username')
  }
  // comparing the hashed password to the user's entered password
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Invalid login credentials: incorrect password')
  }
  return user
}

module.exports = mongoose.model('User', userSchema)
