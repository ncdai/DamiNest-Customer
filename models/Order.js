const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  fullName: {
    type: String,
    required: true
  },

  phoneNumber: {
    type: String,
    required: true
  },

  shippingAddress: {
    type: String,
    required: true
  },

  products: [{
    productId: String,
    title: String,
    featuredImage: String,
    price: Number,
    discount: Number,
    quantity: Number,
    total: Number
  }],

  paymentMethod: {
    type: String,
    enum: ['COD', 'BANK_TRANSFER'],
    default: 'COD',
    required: true
  },

  total: {
    type: Number,
    default: 0
  },

  pushNotification: {
    type: Boolean,
    default: false
  },

  reasonsForRejection: {
    type: String,
    default: ''
  },

  status: {
    type: String,
    enum: ['PENDING', 'PROCESSING', 'TRANSFERRING', 'DONE', 'REJECTED'],
    default: 'PENDING'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema, 'orders')
