const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.get('/init-users', async (req, res) => {
  const user = new User({
    fullName: 'Nguyen Chanh Dai',
    email: 'ncdai@penphy.edu.vn',
    password: 'happy2code',
    avatar: '/images/avatar/ncdai.jpg',
    isVerified: true,
    isBlocked: false,
    role: 'ADMIN'
  })
  const data = await user.save()
  res.json(data)
})

module.exports = router
