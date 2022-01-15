const { ProductModel, OrderModel, UserModel } = require('../models')

const createOrder = async (req, res, next) => {
  try {
    const { body } = req

    const productsFound = await ProductModel.find({
      _id: {
        $in: body.products.map((product) => product.productId)
      }
    }).exec()

    const productsObj = {}
    productsFound.forEach((product) => {
      productsObj[String(product._id)] = product
    })

    const products = body.products.map((p) => {
      const productId = String(p.productId)
      const product = productsObj?.[productId]

      if (!product) {
        return null
      }

      return {
        productId,
        name: product.name,
        featuredImage: product.featuredImage,
        price: product.price,
        discount: product.discount,
        quantity: p.quantity,
        total: (product.price - product.discount) * p.quantity
      }
    }).filter((p) => !!p)

    const total = products.reduce((prev, current) => prev + current.total, 0)

    const newOrder = new OrderModel({
      ownerId: req.user._id,
      fullName: body.fullName,
      phoneNumber: body.phoneNumber,
      shippingAddress: body.shippingAddress,
      products: products,
      paymentMethod: body.paymentMethod,
      total: total,
      status: 'PENDING'
    })

    // Save order and clear cart
    const [order] = await Promise.all([
      newOrder.save(),
      UserModel.findByIdAndUpdate(req.user._id, {
        $set: { cart: [] }
      })
    ])

    res.json(order)
  } catch (error) {
    res.boom.badData(error.message)
  }
}

module.exports = {
  createOrder
}
