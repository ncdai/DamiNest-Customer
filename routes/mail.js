const express = require('express')
const { mailController } = require('../controllers')
const router = express.Router()

router.get('/orders/:orderId', mailController.sendOrderEmail)
router.get('/product-review/:reviewId', mailController.sendProductReviewEmail)

module.exports = router
