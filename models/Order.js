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

  productList: [{
    productId: String,
    title: String,
    price: Number,
    discount: Number,
    featuredImage: String,
    quantity: Number,
    total: Number
  }],

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
