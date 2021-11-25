const ProductCategoryModel = require('../models/productCategory')

const createCategory = async (req, res) => {
  const newCategory = new ProductCategoryModel({
    name: 'Category 1',
    slug: 'category-1'
  })
  const category = await newCategory.save()
  return res.json(category)
}

const initCategories = async (req, res) => {
  const data = await ProductCategoryModel.insertMany([
    {
      name: 'Chân Tổ Yến'
    },
    {
      name: 'Tổ Yến Sơ Chế'
    },
    {
      name: 'Tổ Yến Thô'
    },
    {
      name: 'Tổ Yến Tinh Chế'
    },
    {
      name: 'Yến Vụn'
    }
  ])
  res.json(data)
}

const deleteCategories = async (req, res) => {
  const data = await ProductCategoryModel.deleteMany()
  res.json(data)
}

module.exports = {
  createCategory,
  initCategories,
  deleteCategories
}
