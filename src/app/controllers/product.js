const ProductsModel = require("../models/product");
const CategoriesModel = require("../models/category");
const slug = require("slug");
const paginate = require("../../common/paginate");
const fs = require("fs");
const path = require("path");


const index = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
    const limit = 6;
    skip = page * limit - limit;

    const total = await ProductsModel.find().countDocuments();
    const totalPage = Math.ceil(total/limit);
    // (paginate(page, totalPage);

    const products = await ProductsModel.find()
                                        .populate({ path: "cat_id" })
                                        .skip(skip)
                                        .limit(limit)
                                        .sort({"_id": -1});
    // console.log(products);
    res.render("admin/product/product", 
    { 
        products: products,
        pages: paginate(page, totalPage),
        page: page,
        totalPage: totalPage,
        data: {}
    });
};

const create = async (req, res) => {
  const categories = await CategoriesModel.find().sort({cout:1});
   console.log(categories);
    res.render("admin/product/add_product", {categories:categories});
};

const store = async (req,res)=>{
  const body = req.body;
  let error;
  const file = req.file;
  const slugname = slug(body.name);
  
  const slugduplicate = await ProductsModel.find({slug:slugname});
  const product = {
    description: body.description,
    cat_id: body.cat_id,
    price: body.price,
    quantity: body.quantity,
    featured: body.featured === "on",
    promotion: body.promotion,
    warranty: body.warranty,
    accessories: body.accessories,
    name: body.name,
    slug: slug(body.name),
    }
    if(file){
      const thumbnail = "products/"+file.originalname;
      product["thumbnail"] = thumbnail;
      fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
      new ProductsModel(product).save();
      res.redirect("/admin/products");
    }
 
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