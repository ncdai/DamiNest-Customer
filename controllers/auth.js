const passport = require('passport')

const getRegister = (req, res, next) => {
  res.render('auth/register')
}

const postRegister = (req, res, next) => {
  passport.authenticate('register', {
    successRedirect: '/profile',
    failureRedirect: '/auth/register?res=FAILED'
  })(req, res, next)
}

const getLogin = (req, res, next) => {
  const loginRes = req.query?.res
  res.render('auth/login', { loginRes })
}

const postLogin = (req, res, next) => {
  passport.authenticate('login', {
    failureRedirect: '/auth/login?res=FAILED',
    successRedirect: '/profile'
  })(req, res, next)
}

const getLogout = (req, res) => {
  req.logOut()
  res.redirect('/auth/login')
}

module.exports = {
  getRegister,
  postRegister,

  getLogin,
  postLogin,

  getLogout
}
