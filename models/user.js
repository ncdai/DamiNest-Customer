const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  avatar: {
    type: String,
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: 'CUSTOMER'
  }
})

const UserModel = mongoose.model('User', userSchema, 'users')

module.exports = UserModel
