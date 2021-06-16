const CategoryModel = require("../models/category");
const slug = require("slug");

const index = async (req, res) => {
  const categories = await CategoryModel.find().sort({cout:1})
  res.render("admin/category/category",{
      categories:categories,
  });
};

const create = (req, res) => {
  res.render("admin/category/add_category", {data: {}});
};

const store = async (req,res)=>{
  const body = req.body;
  let error;
  const slugname = slug(body.title);
  
  const slugduplicate = await CategoryModel.find({slug:slugname});
  if(slugduplicate.length > 0){
    error = "Danh mục sản phẩm đã tồn tại !";
  }
  else{
    await new CategoryModel({
      title: body.title,
      status: body.status,    
      slug: slug(body.title),
      descriptions:body.descriptions,
    }).save();
    res.redirect("/admin/categories"); 
  }
  res.render("admin/category/add_category", {data: {error: error}});
 
};

const edit = async (req, res) => {
  const id = req.params.id;
  const category = await CategoryModel.findById(id);
  res.render("admin/category/edit_category",{
      category:category,
  });
};

const update = async (req,res)=>{
  const id = req.params.id;
    const body = req.body;
    const catego = {
      title: body.title,
      status: body.status,    
      slug: slug(body.title),
      descriptions:body.descriptions,
    }
    
    await CategoryModel.updateOne({_id: id}, {$set: catego});
    res.redirect("/admin/categories");
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
  store:store,
  update:update,
};