const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const logger = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')

const { passportMiddleware, authMiddleware } = require('./middlewares')
const { databaseUtils } = require('./utils')
const config = require('./config')

const aboutRouter = require('./routes/about')
const productsRouter = require('./routes/products')
const handbookRouter = require('./routes/handbook')
const usersRouter = require('./routes/users')
const { profileRouter, homeRouter, authRouter } = require('./routes')

const app = express()

// connect to MongoDB
databaseUtils.connectDatabase()
// mongoose.connect(
//   config.MONGODB_URL,
//   {
//     useNewUrlParser: true
//   }
// )
// mongoose.connection.on('connected', function () {
//   console.log('Mongoose is connected')
// })
// mongoose.connection.on('disconnected', function () {
//   console.log('Mongoose is disconnected')
// })
// mongoose.connection.on('error', function (error) {
//   console.log('Mongoose is encountered an error')
//   console.log(error)
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Session

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'sessions'
})

app.use(session({
  store: sessionStore,
  secret: config.SECRET_KEY,
  saveUninitialized: true,
  cookie: {
    // Creating 24 hours * 7 days from milliseconds
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  resave: false
}))

// Passport
passportMiddleware.applyPassportMiddleware(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

// routes
app.use('/', homeRouter)
app.use('/about', aboutRouter)
app.use('/products', productsRouter)
app.use('/handbook', handbookRouter)
app.use('/users', usersRouter)
app.use('/profile', authMiddleware.isAuthenticated, profileRouter)
app.use('/auth', authRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
