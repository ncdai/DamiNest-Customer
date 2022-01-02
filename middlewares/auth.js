const requiredLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/auth/login')
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
