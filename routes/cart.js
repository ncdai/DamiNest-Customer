const express = require('express')
const { cartController } = require('../controllers')
const router = express.Router()

router.get('/', cartController.index)

router.get('/get', cartController.getCart)
router.put('/add', cartController.addToCart)
router.delete('/delete', cartController.deleteFromCart)

module.exports = router
