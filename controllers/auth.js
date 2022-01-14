const { nanoid } = require('nanoid')
const passport = require('passport')
const queryString = require('query-string')
const jwt = require('jsonwebtoken')

const { UserModel } = require('../models')
const { mailUntil } = require('../utils')
const config = require('../config')

const getRegister = (req, res, next) => {
  const registerRes = req.query?.res

  res.render('auth/register', {
    registerRes,

    formAction: queryString.stringifyUrl({
      url: '/auth/register',
      query: { nextUrl: req.query?.nextUrl }
    }),

    loginUrl: queryString.stringifyUrl({
      url: '/auth/login',
      query: { nextUrl: req.query?.nextUrl }
    })
  })
}

const postRegister = (req, res, next) => {
  const failureRedirect = queryString.stringifyUrl({
    url: '/auth/register',
    query: {
      nextUrl: req.query?.nextUrl,
      res: 'FAILED'
    }
  })

  passport.authenticate('register', {
    successRedirect: req.query?.nextUrl || '/profile',
    failureRedirect
  })(req, res, next)
}

const getLogin = (req, res, next) => {
  console.log(req.query)

  const loginRes = req.query?.res
  res.render('auth/login', {
    loginRes,

    formAction: queryString.stringifyUrl({
      url: '/auth/login',
      query: { nextUrl: req.query?.nextUrl }
    }),

    registerUrl: queryString.stringifyUrl({
      url: '/auth/register',
      query: { nextUrl: req.query?.nextUrl }
    })
  })
}

const postLogin = (req, res, next) => {
  const failureRedirect = queryString.stringifyUrl({
    url: '/auth/login',
    query: {
      nextUrl: req.query?.nextUrl,
      res: 'FAILED'
    }
  })

  passport.authenticate('login', {
    successRedirect: req.query?.nextUrl || '/profile',
    failureRedirect: failureRedirect
  })(req, res, next)
}

const getLogout = (req, res) => {
  req.logOut()
  res.redirect('/auth/login')
}

const sendVerificationEmail = async (req, res) => {
  try {
    const emailId = nanoid()

    const user = await UserModel.findByIdAndUpdate(req.user._id, { $set: { emailId } }, { new: true })

    if (!user) {
      res.boom.badRequest('Tài khoản không tồn tại')
      return
    }

    if (user.isVerified) {
      res.boom.badRequest('Tài khoản đã được xác minh')
      return
    }

    const token = jwt.sign(
      {
        userId: req.user._id,
        emailId
      },
      config.SECRET_KEY,
      { expiresIn: '24h' }
    )

    await mailUntil.sendMail({
      // to: req.user.email,
      to: 'ncdai@penphy.edu.vn',
      subject: 'Xác minh tài khoản',
      content: `<a href="http://localhost:8000/auth/verify-email?token=${token}">Click here</a>`
    })

    res.json(true)
  } catch (error) {
    res.boom.badRequest(error.message)
  }
}

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query
    const decoded = jwt.verify(token, config.SECRET_KEY)

    const userId = decoded?.userId
    const emailId = decoded?.emailId

    const user = await UserModel.findById(userId).exec()

    if (!user) {
      res.boom.badRequest('Tài khoản không tồn tại')
      return
    }

    if (user.isVerified) {
      res.boom.badRequest('Tài khoản đã được xác minh')
      return
    }

    if (user.emailId !== emailId) {
      res.boom.badRequest('Mã xác nhận không hợp lệ')
      return
    }

    const updated = await UserModel.findByIdAndUpdate(userId, { $set: { isVerified: true } }, { new: true }).select('-password -emailId')

    res.json(updated)
  } catch (err) {
    res.boom.badRequest('Mã xác nhận không hợp lệ')
  }
}

module.exports = {
  getRegister,
  postRegister,

  getLogin,
  postLogin,

  getLogout,

  sendVerificationEmail,
  verifyEmail
}
