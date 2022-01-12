const { ProductModel, ProductReviewModel } = require('../models')

const postReview = async (req, res) => {
  try {
    const { productId, rating, content } = req.body

    const product = await ProductModel.findById(productId)

    if (!product) {
      res.boom.badRequest()
      return
    }

    // ProductModel.findByIdAndUpdate(productId, {
    //   $set: {
    //     ratingAvg: (product.ratingAvg + rating) / (product.totalRatings + 1),
    //     totalRatings: product.totalRatings + 1
    //   }
    // }, { new: true })

    const review = new ProductReviewModel({
      productId,
      ownerId: req.user._id,
      rating,
      content
    })

    const newReview = await review.save()

    res.json(newReview)
  } catch (error) {
    res.boom.badRequest(error.message)
  }
}

module.exports = {
  postReview
}
