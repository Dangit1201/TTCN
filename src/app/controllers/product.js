const ProductsModel = require("../models/product");
const CategoriesModel = require("../models/category");
const slug = require("slug");

const index =  (req, res) => {
 //category.js const categories = await CategoryModel.find().sort({cout:1})
  res.render("admin/product/product");
};

const create = async (req, res) => {
  const categories = await CategoriesModel.find();
   console.log(categories);
    res.render("admin/product/add_product", {categories:categories});
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


module.exports = {
  index: index,
  create: create,
  edit: edit,
  dele: dele,
  store:store,
  update:update,
};