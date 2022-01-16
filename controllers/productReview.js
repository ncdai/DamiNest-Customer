const _ = require('lodash')
const { ProductModel, ProductReviewModel, OrderModel } = require('../models')

const postCheckCanReview = async (req, res) => {
  try {
    const { userId, productId } = req.body

    const order = await OrderModel.findOne({ ownerId: userId, 'products.productId': productId }).exec()
    if (!order) {
      res.json({
        canReview: false,
        message: 'Bạn không thể nhận xét vì chưa mua sản phẩm này.'
      })
      return
    }

    const count = await ProductReviewModel.findOne({ ownerId: userId, productId }).count().exec()
    if (count > 0) {
      res.json({
        canReview: false,
        message: 'Bạn đã đánh giá sản phẩm này.'
      })
      return
    }

    res.json({
      canReview: true,
      message: ''
    })
  } catch (error) {
    res.boom.badRequest(error.message)
  }
}

const postReview = async (req, res) => {
  try {
    const userId = req.user._id
    const { productId, rating, content } = req.body

    const count = await ProductReviewModel.findOne({ ownerId: userId, productId }).count().exec()
    if (count > 0) {
      res.boom.badData('Bạn đã đánh giá sản phẩm này.')
      return
    }

    const product = await ProductModel.findById(productId).exec()
    if (!product) {
      res.boom.badData('Sản phẩm không tồn tại.')
      return
    }

    const review = new ProductReviewModel({
      productId,
      ownerId: userId,
      rating,
      content: _.escape(content)
    })

    const newReview = await review.save()

    res.json(newReview)
  } catch (error) {
    res.boom.badRequest(error.message)
  }
}

module.exports = {
  postCheckCanReview,
  postReview
}
