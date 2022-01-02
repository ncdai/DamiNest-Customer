const { ProductModel } = require('../models')

const index = async (req, res) => {
  const { docs } = await ProductModel.paginate({}, {
    page: 1,
    limit: 6,
    populate: {
      path: 'categoryId ownerId',
      select: '-password'
    }
  })

  res.render('home/index', { products: docs })
}

module.exports = {
  index
}
