const queryString = require('query-string')

const requiredLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  const redirectUrl = queryString.stringifyUrl({
    url: '/auth/login',
    query: {
      nextUrl: req.originalUrl
    }
  })

  res.redirect(redirectUrl)
}

const notRequiredLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }

  next()
}

module.exports = {
  requiredLogin,
  notRequiredLogin
}
