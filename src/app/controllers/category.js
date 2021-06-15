const CategoryModel = require("../models/category");

const index = async (req, res) => {

  const categories = await CategoryModel.find().sort({cout:1})
  res.render("admin/category/category",{
      categories:categories,
  });
  //return res.status(200).json({message : 'dang112'});
};

const create = (req, res) => {
  res.render("admin/category/add_category");

};

const edit = (req, res) => {
  res.render("admin/category/edit_category");
  console.log(req.params);

};

const dele = async (req, res) => {
  const id = req.params.id;

  await CategoryModel.deleteOne({ _id: id });

  res.redirect("back");
};

const reorder = async (req, res)=>{

  var ids = req.body['id'];
  var count =0;
  for(var i = 0 ;i<ids.length;i++){
    var id = ids[i];
    count++;
    var data = await CategoryModel.findById(id);
    data.cout = count;
    data.save();
  }
};

module.exports = {
  index: index,
  create: create,
  edit: edit,
  dele: dele,
  reorder:reorder,
};