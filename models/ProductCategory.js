const mongoose = require('mongoose')

const productCategorySchema = mongoose.Schema({
  name: String
})

module.exports = mongoose.model('ProductCategory', productCategorySchema, 'productCategories')
