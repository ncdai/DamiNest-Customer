const mongoose = require('mongoose')
const { ProductModel, ProductCategoryModel } = require('../models')
const config = require('../config')

const getProducts = async ({ page, categoryId } = {}) => {
  const query = {}

  if (categoryId) {
    query.categoryId = categoryId
  }

  const data = await ProductModel.paginate(query, {
    page: page || 1,
    limit: config.PAGE_LIMIT,
    populate: {
      path: 'categoryId ownerId',
      select: '-password'
    }
  })

  return data
}

const index = async (req, res) => {
  const { page, categoryId } = req.query

  const [categoriesRes, productsRes] = await Promise.all([
    ProductCategoryModel.find(),
    getProducts({ page, categoryId })
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

    pageUrl: req.originalUrl
  })
}

const view = async (req, res, next) => {
  const { productId } = req.params

  const isValid = mongoose.isValidObjectId(productId)
  if (!isValid) {
    return next(new Error('Mã sản phẩm không hợp lệ!'))
  }

  const product = await ProductModel.findById(productId)
  if (!product) {
    return next(new Error('Không tìm thấy sản phẩm!'))
  }

  res.render('products/view', { product })
}

module.exports = {
  index,
  view
}
