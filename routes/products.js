const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const productController = require('../controllers/productCategory')

router.get('/', async (req, res) => {
  const products = await productController.getProducts()
  res.render('products/index', { products })
})

router.get('/:productId', async (req, res, next) => {
  const { productId } = req.params

  const isValid = mongoose.isValidObjectId(productId)
  if (!isValid) {
    return next(new Error('Mã sản phẩm không hợp lệ!'))
  }

  const product = await productController.getProductById(productId)
  if (!product) {
    return next(new Error('Không tìm thấy sản phẩm!'))
  }

  res.render('products/view', { product })
})

router.get('/init-categories', productController.initCategories)
router.get('/create-category', productController.createCategory)
router.get('/init-products', productController.initProducts)
router.get('/get-products', productController.getProducts)

module.exports = router
