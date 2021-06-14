const CategoryModel = require("../models/category");

const index = (req, res) => {
  res.render("admin/category/category");
  //return res.status(200).json({message : 'dang112'});
};

const create = (req, res) => {
  res.render("admin/category/add_category");

};

const edit = (req, res) => {
  res.render("admin/category/edit_category");
  console.log(req.params);

};

const dele = (req, res) => {
  res.send("delete categories");
};

module.exports = {
  index: index,
  create: create,
  edit: edit,
  dele: dele,
};