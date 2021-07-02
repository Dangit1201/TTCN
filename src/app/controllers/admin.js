const AdvertisementsModel = require("../models/advertisement");
const CategoryModel = require("../models/category");
const ProductsModel = require("../models/product");
const UsersModel = require("../models/user");
const CommentsModel = require("../models/comment");

const index = async (req, res) => {
  const users = await UsersModel.find();
  const totalUsers = users.length;
  const products = await ProductsModel.find();
  const totalProducts = products.length;
  const categories = await CategoryModel.find();
  const totalCategories = categories.length;
  const comments = await CommentsModel.find();
  const totalComments = comments.length;
  const advs = await AdvertisementsModel.find();
  const totalAdvs = advs.length;
  


  res.render("admin/admin-index",{
    totalUsers,
    totalProducts,
    totalCategories,
    totalComments,
    totalAdvs,
  });
};

module.exports = {
  index: index,
};