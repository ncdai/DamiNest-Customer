const bcrypt = require('bcrypt')

const { UserModel } = require('../models')

const index = (req, res) => {
  res.render('profile/me')
}

const updateCart = async (req, res) => {
  try {
    const { user, body } = req

    const userId = user._id

    const updated = await UserModel
      .findByIdAndUpdate(userId, {
        $set: {
          cart: body
        }
      }, { new: true })
      .select('-password -emailId -resetPasswordId')
      .exec()

    res.json(updated)
  } catch (error) {
    res.boom.badRequest(error.message)
  }
}

const patchMe = async (req, res) => {
  try {
    const updated = await UserModel
      .findByIdAndUpdate(req.user._id, {
        $set: {
          fullName: req.body?.fullName,
          phoneNumber: req.body?.phoneNumber,
          address: req.body?.address
        }
      }, { new: true })
      .select('-password -emailId -resetPasswordId')
      .exec()

    res.json(updated)
  } catch (error) {
    res.boom.badRequest(error.message)
  }
}

const getChangePassword = (req, res) => {
  res.render('profile/change-password')
}

const patchChangePassword = async (req, res) => {
  try {
    const userId = req.user._id
    const { currentPassword, newPassword } = req.body

    const user = await UserModel.findById(userId)

    const validate = await user.isValidPassword(currentPassword)

    if (!validate) {
      res.boom.unauthorized('Mật khẩu hiện tại không chính xác')
      return
    }

    const hashPassword = await bcrypt.hash(newPassword, 10)

    const updated = await UserModel
      .findByIdAndUpdate(userId, { $set: { password: hashPassword } })
      .select('-password -emailId -resetPasswordId')
      .exec()

    res.json(updated)
  } catch (error) {
    res.boom.badRequest(error.message)
  }
}

const getPurchases = async (req, res) => {
  res.render('profile/purchases')
}

module.exports = {
  index,
  patchMe,

  updateCart,

  getChangePassword,
  patchChangePassword,

  getPurchases
}
