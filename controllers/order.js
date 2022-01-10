const { ProductModel, OrderModel } = require('../models')

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
        title: product.title,
        featuredImage: product.featuredImage,
        price: product.price,
        discount: product.discount,
        quantity: p.quantity,
        total: (product.price - product.discount) * p.quantity
      }
    }).filter((p) => !!p)

    const total = products.reduce((prev, current) => prev + current.total, 0)

    const newOrder = new OrderModel({
      ownerId: body.ownerId,
      fullName: body.fullName,
      phoneNumber: body.phoneNumber,
      shippingAddress: body.shippingAddress,
      products: products,
      paymentMethod: body.paymentMethod,
      total: total,
      status: 'PENDING'
    })

    const order = await newOrder.save()

    res.json(order)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createOrder
}
