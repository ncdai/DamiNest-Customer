const express = require('express')
const router = express.Router()

const { profileController } = require('../controllers')

router.get('/', profileController.index)
router.put('/cart', profileController.updateCart)

module.exports = router
