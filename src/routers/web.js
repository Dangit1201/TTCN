const express = require("express");
const router = require('express-promise-router')()

//Goi controllers
const CategoryController = require("../app/controllers/category");
const AdminController = require("../app/controllers/admin");
const ProductController = require("../app/controllers/product");
const SiteContoller = require("../app/controllers/site");
const AuthContoller = require("../app/controllers/auth")

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

//===========Product===============
router.get("/admin/products",AuthMiddleware.checkAdmin,ProductController.index);
router.get("/admin/products/create",AuthMiddleware.checkAdmin,ProductController.create);
router.post("/admin/products/store",AuthMiddleware.checkAdmin,UploadMiddleware.single("thumbnail"),ProductController.store);
router.get("/admin/products/edit/:id",AuthMiddleware.checkAdmin,ProductController.edit);
router.post("/admin/products/update/:id",AuthMiddleware.checkAdmin,UploadMiddleware.single("thumbnail"),ProductController.update);
router.post("/admin/products/delete/:id",AuthMiddleware.checkAdmin,ProductController.dele);

//===========Site===============
router.get("/", SiteContoller.home);
router.get("/category-:slug.:id", SiteContoller.category);
router.get("/product-:slug.:id", SiteContoller.product);
router.get("/search", SiteContoller.search);
router.get("/cart", SiteContoller.cart);
router.get("/success", SiteContoller.success);

//===========Login and Register===============
router.get("/login",AuthMiddleware.checkLoginAdmin,AuthContoller.Login);
router.post("/login",AuthMiddleware.checkLoginAdmin, AuthContoller.postLogin);
router.get("/register", AuthContoller.register);
router.post("/register", AuthContoller.registersuccess);

module.exports = router;
