const express = require('express')
const router = express.Router()

const productController = require('../controllers/product')

router.get('/', async (req, res, next) => {
  const { docs } = await productController.getProducts()
  res.render('home/index', { products: docs })
})

module.exports = router
