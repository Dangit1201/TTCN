const CategoryModel = require("../models/category");
module.exports = async (req, res, next)=>{

    res.locals.categoriesshare = await CategoryModel.find().sort({cout:1});
    next();
}
