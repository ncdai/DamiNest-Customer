const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory'
  },
  featuredImage: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  maxQuantity: {
    type: Number,
    default: 0
  },
  ratingAvg: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  regularPrice: {
    type: Number,
    default: 0
  },
  salePrice: {
    type: Number,
    default: 0
  },
  ingredient: {
    type: String,
    default: ''
  },
  mass: {
    type: String,
    default: ''
  },
  uses: {
    type: String,
    default: ''
  },
  preservation: {
    type: String,
    default: ''
  },
  expiryDate: {
    type: String,
    default: ''
  },
  origin: {
    type: String,
    default: ''
  },
  currency: {
    type: String,
    default: 'VND'
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const ProductModel = mongoose.model('Product', productSchema, 'products')

module.exports = ProductModel
