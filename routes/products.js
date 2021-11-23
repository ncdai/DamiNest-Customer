const express = require('express')
const router = express.Router()

const productController = require('../controllers/productCategory')

router.get('/', function (req, res) {
  res.render('products/index')
})

router.get('/view', function (req, res) {
  res.render('products/view')
})

router.get('/create-category', productController.createCategory)

module.exports = router
