const mongoose = require('mongoose')

const productCategorySchema = mongoose.Schema({
  name: String
}, {
  timestamps: true
})

module.exports = mongoose.model('ProductCategory', productCategorySchema, 'productCategories')
