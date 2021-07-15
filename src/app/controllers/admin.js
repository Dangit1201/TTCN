const AdvertisementsModel = require("../models/advertisement");
const CategoryModel = require("../models/category");
const ProductsModel = require("../models/product");
const UsersModel = require("../models/user");
const CommentsModel = require("../models/comment");
const BlogsModel = require("../models/blog");
const OrdersModel = require("../models/order");



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
  const blogs = await BlogsModel.find();
  const totalblogs = blogs.length;
  const newordereds = await OrdersModel.find({status:"Tiếp nhận đơn hàng"});
  const totalnewordereds = newordereds.length;
  const transport = await OrdersModel.find({status:"Vận chuyển"});
  const totaltransport = transport.length;
  const del = await OrdersModel.find({status:"Hủy đơn hàng"});
  const totaldel = del.length;
  


  res.render("admin/admin-index",{
    totalUsers,
    totalProducts,
    totalCategories,
    totalComments,
    totalAdvs,
    totalblogs,
    totalnewordereds,
    totaltransport,
    totaldel
  });
};

module.exports = {
  index: index,
};