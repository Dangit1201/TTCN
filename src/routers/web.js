const express = require("express");
const router = require('express-promise-router')()

//Goi controllers
const CategoryController = require("../app/controllers/category");
const AdminController = require("../app/controllers/admin");
const ProductController = require("../app/controllers/product");
const SiteContoller = require("../app/controllers/site");
const AuthContoller = require("../app/controllers/auth");
const UserContoller = require("../app/controllers/user");
const AdvertisementContoller = require("../app/controllers/advertisement");


//Goi middlewares
const UploadMiddleware = require("../app/middlewares/upload");
const AuthMiddleware = require("../app/middlewares/auth");

//===========admin================
router.get("/admin",AuthMiddleware.checkAdmin,AdminController.index);

//===========Category===============
router.get("/admin/categories",AuthMiddleware.checkAdmin,CategoryController.index);
router.get("/admin/categories/create",AuthMiddleware.checkAdmin,CategoryController.create);
router.post("/admin/categories/store",AuthMiddleware.checkAdmin,CategoryController.store);
router.get("/admin/categories/edit/:id",AuthMiddleware.checkAdmin,CategoryController.edit);
router.post("/admin/categories/update/:id",AuthMiddleware.checkAdmin,CategoryController.update);
router.post("/admin/categories/delete/:id",AuthMiddleware.checkAdmin,CategoryController.dele);
router.post("/admin/categories/reorder",AuthMiddleware.checkAdmin,CategoryController.reorder);

//===========User===============
router.get("/admin/users",AuthMiddleware.checkAdmin,UserContoller.index);
router.get("/admin/users/create",AuthMiddleware.checkAdmin,UserContoller.create);
router.post("/admin/users/store",AuthMiddleware.checkAdmin,UserContoller.store);
router.get("/admin/users/edit/:id",AuthMiddleware.checkAdmin,UserContoller.edit);
router.post("/admin/users/update/:id",AuthMiddleware.checkAdmin,UserContoller.update);
router.post("/admin/users/delete/:id",AuthMiddleware.checkAdmin,UserContoller.dele);
/* router.post("/admin/users/search",UserContoller.searchUser);
router.post("/admin/users/searchpagi",UserContoller.searchUserPagi); */

//===========Product===============
router.get("/admin/products",AuthMiddleware.checkAdmin,ProductController.index);
router.get("/admin/products/create",AuthMiddleware.checkAdmin,ProductController.create);
router.post("/admin/products/store",AuthMiddleware.checkAdmin,UploadMiddleware.single("thumbnail"),ProductController.store);
router.get("/admin/products/edit/:id",AuthMiddleware.checkAdmin,ProductController.edit);
router.post("/admin/products/update/:id",AuthMiddleware.checkAdmin,UploadMiddleware.single("thumbnail"),ProductController.update);
router.post("/admin/products/delete/:id",AuthMiddleware.checkAdmin,ProductController.dele);
router.get("/testdata",ProductController.test);

//===========commentadmin===============
router.get("/admin/comments",ProductController.commentindex);
router.post("/admin/comments/delete/:id",ProductController.commentdele);

//===========advertisement===============
router.get("/admin/advertisements",AuthMiddleware.checkAdmin,AdvertisementContoller.index);
router.get("/admin/advertisements/create",AuthMiddleware.checkAdmin,AdvertisementContoller.create);
router.post("/admin/advertisements/store",AuthMiddleware.checkAdmin,UploadMiddleware.single("thumbnail"),AdvertisementContoller.store);
router.get("/admin/advertisements/edit/:id",AuthMiddleware.checkAdmin,AdvertisementContoller.edit);
router.post("/admin/advertisements/update/:id",AuthMiddleware.checkAdmin,UploadMiddleware.single("thumbnail"),AdvertisementContoller.update);
router.post("/admin/advertisements/delete/:id",AuthMiddleware.checkAdmin,AdvertisementContoller.dele);




//===========Site===============
router.get("/", SiteContoller.home);
router.get("/category-:slug.:id", SiteContoller.category);
router.get("/product-:slug.:id", SiteContoller.product);
router.get("/search", SiteContoller.search);
router.get("/cart", SiteContoller.cart);
router.get("/success", SiteContoller.success);
router.post("/product-:slug.:id", SiteContoller.comment);
router.get("/category", SiteContoller.allcategory);
router.get("/contact", SiteContoller.contact);
router.get("/account", SiteContoller.account);
router.get("/blog", SiteContoller.blog);
router.get("/autocomplete", SiteContoller.autocomplete);

//===========Login and Register===============
router.get("/login",AuthMiddleware.checkLoginAdmin,AuthContoller.Login);
router.post("/login",AuthMiddleware.checkLoginAdmin, AuthContoller.postLogin);
router.get("/register", AuthContoller.register);
router.post("/register", AuthContoller.registersuccess);

module.exports = router;
