const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const home = async (req, res)=>{
    
    const LatestProducts = await ProductModel.find().sort({_id: -1}).limit(6);
    const FeaturedProducts = await ProductModel.find({
        featured: true,
    }).limit(6);
    // console.log(LatestProducts);
    // console.log(FeaturedProducts);
    res.render("site/index", {
        LatestProducts:LatestProducts,
        FeaturedProducts:FeaturedProducts,
    });
}
const category = async (req, res)=>{
    // const slug = req.params.slug;
    const id = req.params.id;
    const category = await CategoryModel.findById(id);
    const title = category.title
    // console.log(category);
    const products = await ProductModel.find({
        cat_id: id
    }).sort({_id: -1});
    res.render("site/product-list", {title, products});
}
const product = async (req, res)=>{
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    res.render("site/product-detail", {product});
}
const search = (req, res)=>{
    res.render("site/search");
}
const cart = (req, res)=>{
    res.render("site/cart");
}
const success = (req, res)=>{
    res.render("site/success");
}
module.exports = {
    home:home,
    category:category,
    product:product,
    search:search,
    cart:cart,
    success:success
}