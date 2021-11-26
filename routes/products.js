const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const queryString = require('query-string')

const productCategoryController = require('../controllers/productCategory')
const productController = require('../controllers/product')

router.get('/', async (req, res) => {
  const { page, categoryId } = req.query

  const [categoriesRes, productsRes] = await Promise.all([
    productCategoryController.getCategories(),
    productController.getProducts({ page, categoryId })
  ])

  const {
    docs,
    page: currentPage,
    totalPages
  } = productsRes

  res.render('products/index', {
    categoryId,
    categories: categoriesRes,

    products: docs,
    page: currentPage,
    totalPages,

    queryString,
    pageUrl: req.originalUrl
  })
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

router.get('/init-categories', productCategoryController.initCategories)
router.get('/create-category', productCategoryController.createCategory)

router.get('/init-products', productController.initProducts)
router.get('/get-products', productController.getProducts)

module.exports = router
