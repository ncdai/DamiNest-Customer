const mongoose = require('mongoose')

const productCategorySchema = mongoose.Schema({
  name: String,
  slug: String
})

const ProductCategoryModel = mongoose.model('ProductCategory', productCategorySchema, 'productCategories')

module.exports = ProductCategoryModel
