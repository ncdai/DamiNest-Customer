const ProductCategoryModel = require('../models/productCategory')

const createCategory = async (req, res) => {
  const newCategory = new ProductCategoryModel({
    name: 'Category 1',
    slug: 'category-1'
  })
  const category = await newCategory.save()
  return res.json(category)
}

module.exports = {
  createCategory
}
