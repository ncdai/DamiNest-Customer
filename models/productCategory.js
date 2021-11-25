const mongoose = require('mongoose')

const productCategorySchema = mongoose.Schema({
  name: String
})

const ProductCategoryModel = mongoose.model('ProductCategory', productCategorySchema, 'productCategories')

module.exports = ProductCategoryModel
