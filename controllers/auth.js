const passport = require('passport')
const queryString = require('query-string')

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

module.exports = {
  getRegister,
  postRegister,

  getLogin,
  postLogin,

  getLogout
}
