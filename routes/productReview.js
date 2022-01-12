const express = require('express')
const router = express.Router()

const { productReviewController } = require('../controllers')
const { authMiddleware } = require('../middlewares')

router.post('/', authMiddleware.requiredLogin, productReviewController.postReview)

module.exports = router
