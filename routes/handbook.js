const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('handbook/index')
})

router.get('/view', function (req, res) {
  res.render('handbook/view')
})

module.exports = router
