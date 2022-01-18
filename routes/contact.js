const express = require('express')
const { contactController } = require('../controllers')
const router = express.Router()

router.get('/', contactController.index)

module.exports = router
