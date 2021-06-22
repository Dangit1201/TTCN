const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const paginate = require("../../common/paginate");
const home = async (req, res)=>{
    
    const LatestProducts = await ProductModel.find().sort({_id: -1}).limit(6);
    const FeaturedProducts = await ProductModel.find({
        featured: true,
    }).sort({_id: -1}).limit(6);
    // console.log(LatestProducts);
    // console.log(FeaturedProducts);
    res.render("site/index", {
        LatestProducts:LatestProducts,
        FeaturedProducts:FeaturedProducts,
    });
}
const category = async (req, res)=>{
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    skip = page * limit - limit;

    const total = await ProductModel.find({cat_id:id}).countDocuments();
    const totalPage = Math.ceil(total/limit);
    // (paginate(page, totalPage);

    const products = await ProductModel.find({cat_id: id})
                                        .populate({ path: "cat_id" })
                                        .skip(skip)
                                        .limit(limit)
                                        .sort({"_id": -1});
     
    //console.log(products);
    /* console.log('pages',paginate(page, totalPage));
    console.log('page',page);
    console.log('total',total);
    console.log('totalPage',totalPage); */

    const category = await CategoryModel.findById({_id:id});
    const title = category.title
    res.render("site/product-list", {
        title:title,
        products:products,
        pages: paginate(page, totalPage),
        page: page,
        totalPage: totalPage,
        category:category
        });
}
const product = async (req, res)=>{
    const id = req.params.id;
    const product = await ProductModel.findById(id).populate('color_id');
    const relatedProducts = await ProductModel.find(
        {$and:[{'price': {$gte: product.price-(product.price/10) , $lte: product.price+(product.price/10)}}]}
    ).sort({_id: -1}).limit(5);
    
    res.render("site/product-detail", {
        product,
        relatedProducts
    });
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
    success:success,
    
}