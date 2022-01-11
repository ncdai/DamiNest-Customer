const express = require('express')
const { checkoutController } = require('../controllers')
const router = express.Router()

router.get('/shipping', checkoutController.shipping)
router.get('/payment', checkoutController.payment)
router.get('/success', checkoutController.success)

module.exports = router
