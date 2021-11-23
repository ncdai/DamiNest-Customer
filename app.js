const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const config = require('./config')

const indexRouter = require('./routes/index')
const aboutRouter = require('./routes/about')
const productsRouter = require('./routes/products')
const handbookRouter = require('./routes/handbook')

const app = express()

// connect to MongoDB
mongoose.connect(
  config.MONGODB_URL,
  {
    useNewUrlParser: true
  }
)
mongoose.connection.on('connected', function () {
  console.log('Mongoose is connected')
})
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose is disconnected')
})
mongoose.connection.on('error', function (error) {
  console.log('Mongoose is encountered an error')
  console.log(error)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', indexRouter)
app.use('/about', aboutRouter)
app.use('/products', productsRouter)
app.use('/handbook', handbookRouter)

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
