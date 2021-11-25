const express = require('express')
const router = express.Router()

const productController = require('../controllers/productCategory')

router.get('/', async (req, res, next) => {
  const products = await productController.getProducts()
  res.render('home/index', { products })
})

module.exports = router
