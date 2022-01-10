const { ProductModel, OrderModel } = require('../models')

const createOrder = async (req, res, next) => {
  try {
    const { body } = req

    const products = await ProductModel.find({
      _id: {
        $in: body.productList.map((product) => product._id)
      }
    }).exec()

    const productsObj = {}
    products.forEach((product) => {
      productsObj[String(product._id)] = product
    })

    const productList = body.productList.map((p) => {
      const product = productsObj?.[String(p._id)]

      if (!product) {
        return null
      }

      return {
        productId: String(product._id),
        title: product.title,
        featuredImage: product.featuredImage,
        price: product.price,
        discount: product.discount,
        quantity: p.quantity,
        total: (product.price - product.discount) * p.quantity
      }
    }).filter((p) => !!p)

    const total = productList.reduce((prev, current) => prev + current.total, 0)

    const order = new OrderModel({
      ownerId: body.ownerId,
      fullName: body.fullName,
      phoneNumber: body.phoneNumber,
      shippingAddress: body.shippingAddress,
      productList: productList,
      total: total,
      status: 'PENDING'
    })

    const newOrder = await order.save()

    res.json(newOrder)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createOrder
}
