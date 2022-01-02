const express = require('express')
const router = express.Router()

const { authMiddleware } = require('../middlewares')
const { authController } = require('../controllers')

router.get('/register', authMiddleware.notRequiredLogin, authController.getRegister)
router.post('/register', authMiddleware.notRequiredLogin, authController.postRegister)

router.get('/login', authMiddleware.notRequiredLogin, authController.getLogin)
router.post('/login', authMiddleware.notRequiredLogin, authController.postLogin)

router.get('/logout', authMiddleware.requiredLogin, authController.getLogout)

module.exports = router
