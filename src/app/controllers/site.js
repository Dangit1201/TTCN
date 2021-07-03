const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const paginate = require("../../common/paginate");
const CommentModel = require("../models/comment");
const AdvertisementsModel = require("../models/advertisement");
const home = async (req, res)=>{
    
    const LatestProducts = await ProductModel.find().sort({_id: -1}).limit(6);
    const Banner = await AdvertisementsModel.find().sort({_id: -1}).limit(3);
    const FeaturedProducts = await ProductModel.find({
        featured: true,
    }).sort({_id: -1}).limit(6);
    // console.log(LatestProducts);
    // console.log(FeaturedProducts);
    res.render("site/index", {
        LatestProducts:LatestProducts,
        FeaturedProducts:FeaturedProducts,
        Banner:Banner,
    });
}
const category = async (req, res)=>{
    const id = req.params.id;
                                        
    const category = await CategoryModel.findById({_id:id});
    const title = category.title
    
        let sort = req.query.sort;
        if(sort==='14'){
            
            const page = parseInt(req.query.page) || 1;
            const limit = 9;
            skip = page * limit - limit;
            const total = await ProductModel.find({cat_id:id,price:{ $gte:1000000 , $lte:4000000}}).count();
            
            const totalPage = Math.ceil(total/limit);
    
            const products = await ProductModel.find({cat_id:id,price:{ $gte:1000000 , $lte:4000000}})
                                                .populate({ path: "cat_id" })
                                                .skip(skip)
                                                .limit(limit)
                                                .sort({"price": 1});
            
            res.render("site/product-list", {
                products:products,
                pages: paginate(page, totalPage),
                page: page,
                totalPage: totalPage,
                sort,
                title:title,
                category:category
                });
        }else if(sort=='48'){
            const page = parseInt(req.query.page) || 1;
            const limit = 9;
            skip = page * limit - limit;
    
            console.log('sort48',typeof(sort))
            const total = await ProductModel.find({cat_id:id,price:{ $gte:4000000 , $lte:8000000}}).count();
            
            const totalPage = Math.ceil(total/limit);
    
            const products = await ProductModel.find({cat_id:id,price:{ $gte:4000000 , $lte:8000000}})
                                                .populate({ path: "cat_id" })
                                                .skip(skip)
                                                .limit(limit)
                                                .sort({"price": 1});
            console.log("product.js",products);
            
            res.render("site/product-list", {
                products:products,
                pages: paginate(page, totalPage),
                page: page,
                totalPage: totalPage,
                sort,
                title:title,
                category:category
                });
        }else if(sort==='815'){
            const page = parseInt(req.query.page) || 1;
            const limit = 9;
            skip = page * limit - limit;
    
            const total = await ProductModel.find({cat_id:id,price:{ $gte:8000000 , $lte:15000000}}).count();
            
            const totalPage = Math.ceil(total/limit);
    
            const products = await ProductModel.find({cat_id:id,price:{ $gte:8000000 , $lte:15000000}})
                                                .populate({ path: "cat_id" })
                                                .skip(skip)
                                                .limit(limit)
                                                .sort({"price": 1});
            
            res.render("site/product-list", {
                products:products,
                pages: paginate(page, totalPage),
                page: page,
                totalPage: totalPage,
                sort,
                title:title,
                category:category
                });
        }else if(sort==='gte15'){
            const page = parseInt(req.query.page) || 1;
            const limit = 9;
            skip = page * limit - limit;
            const total = await ProductModel.find({cat_id:id,price:{ $gte:15000000 }}).count();
            
            const totalPage = Math.ceil(total/limit);
    
            const products = await ProductModel.find({cat_id:id,price:{ $gte:15000000 }})
                                                .populate({ path: "cat_id" })
                                                .skip(skip)
                                                .limit(limit)
                                                .sort({"price": 1});
            
            res.render("site/product-list", {
                products:products,
                pages: paginate(page, totalPage),
                page: page,
                totalPage: totalPage,
                sort,
                title:title,
                category:category
                });
        }else{
            sort = null;
            const page = parseInt(req.query.page) || 1;
            const limit = 9;
            skip = page * limit - limit;
            const total = await ProductModel.find({cat_id:id}).countDocuments();
            const totalPage = Math.ceil(total/limit);
            
            const products = await ProductModel.find({cat_id:id})
                                                .populate({ path: "cat_id" })
                                                .skip(skip)
                                                .limit(limit)
                                                .sort({"_id": -1});
            
            res.render("site/product-list", {
                products:products,
                pages: paginate(page, totalPage),
                page: page,
                totalPage: totalPage,
                sort,
                title:title,
                category:category
                });
        }




}
const product = async (req, res)=>{
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    skip = page * limit - limit;

    const total = await CommentModel.find({prd_id: id}).countDocuments();
    const totalPage = Math.ceil(total/limit);
    const product = await ProductModel.findById(id).populate('color_id');
    const comments = await CommentModel.find({prd_id: id}).skip(skip)
                                                        .limit(limit);
    const relatedProducts = await ProductModel.find(
        {$and:[{'price': {$gte: product.price-(product.price/10) , $lte: product.price+(product.price/10)}}]}
    ).sort({_id: -1}).limit(5);
    
    res.render("site/product-detail", {
        product,
        relatedProducts,
        comments,
        pages: paginate(page, totalPage),
        page: page,
        totalPage: totalPage,
    });
}

const cart = (req, res)=>{
    const products = req.session.cart;
    
    res.render("site/cart",{products, totalPrice: 0,totalprd:0,totalPricePrd:0});
}
const success = (req, res)=>{
    res.render("site/success");
}
const comment = async (req, res)=>{
    const id = req.params.id.toString();
    const productcomment = await ProductModel.findById(id);
    const comment = {
        prd_id: id,
        rating: req.body.star,
        full_name: req.body.full_name,
        email: req.body.email,
        body: req.body.body,
        name: productcomment.name,
    }
    await new CommentModel(comment).save();
    res.redirect(req.path);
}

const allcategory = async (req, res)=>{
    let sort = req.query.sort;
    if(sort==='14'){
        
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        skip = page * limit - limit;
        const total = await ProductModel.find({price:{ $gte:1000000 , $lte:4000000}}).count();
        
        const totalPage = Math.ceil(total/limit);

        const products = await ProductModel.find({price:{ $gte:1000000 , $lte:4000000}})
                                            .skip(skip)
                                            .limit(limit)
                                            .sort({"price": 1});
        
        res.render("site/product-all-list", {
            products:products,
            pages: paginate(page, totalPage),
            page: page,
            totalPage: totalPage,
            sort
            });
    }else if(sort=='48'){
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        skip = page * limit - limit;

        console.log('sort48',typeof(sort))
        const total = await ProductModel.find({price:{ $gte:4000000 , $lte:8000000}}).count();
        
        const totalPage = Math.ceil(total/limit);

        const products = await ProductModel.find({price:{ $gte:4000000 , $lte:8000000}})
                                            .skip(skip)
                                            .limit(limit)
                                            .sort({"price": 1});
        console.log("product.js",products);
        
        res.render("site/product-all-list", {
            products:products,
            pages: paginate(page, totalPage),
            page: page,
            totalPage: totalPage,
            sort
            });
    }else if(sort==='815'){
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        skip = page * limit - limit;

        const total = await ProductModel.find({price:{ $gte:8000000 , $lte:15000000}}).count();
        
        const totalPage = Math.ceil(total/limit);

        const products = await ProductModel.find({price:{ $gte:8000000 , $lte:15000000}})
                                            .skip(skip)
                                            .limit(limit)
                                            .sort({"price": 1});
        
        res.render("site/product-all-list", {
            products:products,
            pages: paginate(page, totalPage),
            page: page,
            totalPage: totalPage,
            sort,
            });
    }else if(sort==='gte15'){
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        skip = page * limit - limit;
        const total = await ProductModel.find({price:{ $gte:15000000 }}).count();
        
        const totalPage = Math.ceil(total/limit);

        const products = await ProductModel.find({price:{ $gte:15000000 }})
                                            .skip(skip)
                                            .limit(limit)
                                            .sort({"price": 1});
        
        res.render("site/product-all-list", {
            products:products,
            pages: paginate(page, totalPage),
            page: page,
            totalPage: totalPage,
            sort
            });
    }else{
        sort = null;
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        skip = page * limit - limit;
        const total = await ProductModel.find().countDocuments();
        const totalPage = Math.ceil(total/limit);
        
        const products = await ProductModel.find()
                                            .skip(skip)
                                            .limit(limit)
                                            .sort({"_id": -1});
        
        res.render("site/product-all-list", {
            products:products,
            pages: paginate(page, totalPage),
            page: page,
            totalPage: totalPage,
            sort
            });
    }
 
}

const contact = (req, res)=>{
    res.render("site/contact");
}
const account = (req, res)=>{
    res.render("site/my-account");
}
const blog = (req, res)=>{
    res.render("site/blog");
}
const autocomplete = async (req, res)=>{
    var regax = new RegExp(req.query["term"],'i'); 
   try{
       let result = await ProductModel.find({name:regax}).sort({"updatedAt":-1}).sort({"createdAt":-1}).limit(8); 
       res.send(result);
   } catch(e){
       res.status(500).send({message:e.message});
   }
    
}
const search = async(req, res)=>{
    var keyword = req.query.term;
    var regax = new RegExp(req.query["term"],'i');

    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    skip = page * limit - limit;
    let total = await ProductModel.find({name:regax}).countDocuments();
    const totalPage = Math.ceil(total/limit);

    let products = await ProductModel.find({name:regax}).sort({"updatedAt":-1}).sort({"createdAt":-1}).skip(skip)
    .limit(limit); 
     
    res.render("site/search",{products,
        keyword,
        pages: paginate(page, totalPage),
        page: page,
        totalPage: totalPage,
    });
}
const searchallcat = async (req, res)=>{
    const keyword = req.body.data || "";
    
    var regax = new RegExp(keyword,'i');
    let products = await ProductModel.find({name:regax}).sort({"updatedAt":-1}).sort({"createdAt":-1});

    res.render("site/components/table",{products,keyword});
}

const addToCart = async (req, res)=>{
    const body = req.body;
    const items = req.session.cart;

    //	Sản phẩm mua rồi thì tăng số lượng
	let isUpdate = false;
    items.map((item)=>{
        if(body.id === item.id && body.color=== item.color){
            isUpdate = true;
            item.qty += parseInt(body.qty);
        }
        return item;
    });

    //	Sản phẩm chưa mua thì thêm mới
	if(!isUpdate){
        const product = await ProductModel.findById(body.id);
        items.push({
            id: product._id,
            name: product.name,
            price: product.price,
            img: product.thumbnail,
            qty: parseInt(body.qty),
            color: body.color,
        });
    }
    req.session.cart = items;
    
    res.redirect("/cart");
}

const delCart = (req, res)=>{
    const id = req.params.id;
    const items = req.session.cart;
    items.map((item, key)=>{
        if(item.id === id){
            items.splice(key, 1);
        }
        return item;
    });
    req.session.cart = items;
    res.redirect("/cart");
} 
const updateCart = (req, res) => {
    const products = req.body.products;
    const body = req.body;   
    const items = req.session.cart;

    items.map((item) => { 
        if (products[item.color][item.id]) {
            
            item.qty = parseInt(products[item.color][item.id]);
        }
        return item;
    });
    res.redirect("/cart"); 
}
    
module.exports = {
    home:home,
    category:category,
    product:product,
    search:search,
    cart:cart,
    success:success,
    comment:comment,
    allcategory:allcategory,
    contact:contact,
    account:account,
    blog:blog,
    autocomplete:autocomplete,
    searchallcat:searchallcat,
    addToCart:addToCart,
    delCart:delCart,
    updateCart:updateCart,
    
}