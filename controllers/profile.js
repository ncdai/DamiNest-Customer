const { UserModel } = require('../models')

const index = (req, res) => {
  res.render('profile/me')
}

const updateCart = async (req, res) => {
  const { user, body } = req

  const userId = user._id

  const updated = await UserModel.findByIdAndUpdate(userId, {
    $set: {
      cart: body
    }
  }, {
    new: true
  })

  res.json(updated)
}

module.exports = {
  index,
  updateCart
}
