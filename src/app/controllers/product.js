const ProductsModel = require("../models/product");
const CategoriesModel = require("../models/category");
const slug = require("slug");
const paginate = require("../../common/paginate");
const fs = require("fs");
const path = require("path");
const ProductModel = require("../models/product");


const index = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    skip = page * limit - limit;

    const total = await ProductsModel.find().countDocuments();
    const totalPage = Math.ceil(total/limit);
    // (paginate(page, totalPage);
    /* console.log('pages',paginate(page, totalPage));
    console.log('page',page);
    console.log('totalPage',totalPage); */

    const products = await ProductsModel.find()
                                        .populate({ path: "cat_id" })
                                        .skip(skip)
                                        .limit(limit)
                                        .sort({"_id": -1});
     
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
  //console.log(categories);
    res.render("admin/product/add_product", {
      categories:categories,
      data: {},
    });
};

const store = async (req,res)=>{
  const body = req.body;
  const file = req.file;
  let error;
  const slugname = slug(body.name);
  const slugduplicate = await ProductModel.find({slug:slugname});
  const categories = await CategoriesModel.find().sort({cout:1});
    if(slugduplicate.length > 0){
      error = "Sản phẩm đã tồn tại !";
    }
    else{
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
  }
  res.render("admin/product/add_product", {
    data: {error: error},
    categories:categories
  });
 
};

const edit = async (req, res) => {
  const categories = await CategoriesModel.find();
  const id = req.params.id;
  const product = await ProductsModel.findById(id);
  res.render("admin/product/edit_product",{
    product:product,
    categories:categories
  });
};

const update = async (req,res)=>{
  const id = req.params.id;
  const body = req.body;
  const file = req.file;
  const productid = await ProductsModel.findById(id);
  var quantityupdate=  Number(productid.quantity) + Number(body.quantity);

  const product = {
    description: body.description,
    cat_id: body.cat_id,
    price: body.price,
    quantity: quantityupdate,
    featured: body.featured === "on",
    promotion: body.promotion,
    warranty: body.warranty,
    accessories: body.accessories,
    name: body.name,
    slug: slug(body.name),
    }
     //console.log('product',product);
    if(file){
        const thumbnail = "products/"+file.originalname;
        product["thumbnail"] = thumbnail;
        fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
      }
      await ProductsModel.updateOne({_id: id}, {$set: product});
      res.redirect("/admin/products");
};

const dele = async (req, res) => {
  const id = req.params.id;
  await ProductsModel.deleteOne({_id: id});
  res.redirect("/admin/products");
};


module.exports = {
  index: index,
  create: create,
  edit: edit,
  dele: dele,
  store:store,
  update:update,
};