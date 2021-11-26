const ProductModel = require('../models/product')
// const ejs = require('ejs')
const config = require('../config')
const { PRODUCTS } = require('../constants/product')

const initProducts = async (req, res) => {
  const data = await ProductModel.insertMany(PRODUCTS)
  res.json(data)
}

const getProducts = async ({ page, categoryId } = {}) => {
  const query = {}

  // const html = await ejs.renderFile('views/layout/pagination.ejs', { current: 1, pages: 100 })
  // console.log(html)

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

const getProductById = async (productId) => {
  const product = await ProductModel.findById(productId)
  return product
}

module.exports = {
  initProducts,
  getProducts,
  getProductById
}
