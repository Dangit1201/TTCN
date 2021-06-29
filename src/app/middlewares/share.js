const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const AdvertisementsModel = require("../models/advertisement");
module.exports = async (req, res, next)=>{

    res.locals.categoriesshare = await CategoryModel.find({status:true}).sort({cout:1});
    res.locals.advertisementsshare = await AdvertisementsModel.find({typeofadv:'banner'}).sort({cout:-1}).limit(8);
    res.locals.FeaturedProductsshare = await ProductModel.find({
        featured: true,
    }).sort({_id: -1}).limit(6);
    next();
}
