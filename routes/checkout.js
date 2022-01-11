const express = require('express')
const { checkoutController, cartController } = require('../controllers')
const router = express.Router()

const { authMiddleware } = require('../middlewares')

router.get('/cart', cartController.index)
router.get('/cart/get', cartController.getCart)
router.put('/cart/add', cartController.addProductToCart)
router.delete('/cart/delete', cartController.deleteProductFromCart)

router.get('/shipping', authMiddleware.requiredLogin, checkoutController.shipping)
router.get('/payment', authMiddleware.requiredLogin, checkoutController.payment)
router.get('/success', authMiddleware.requiredLogin, checkoutController.success)

module.exports = router
