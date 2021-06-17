const express = require("express");
const router = require('express-promise-router')()

//Goi controllers
const CategoryController = require("../app/controllers/category");
const AdminController = require("../app/controllers/admin");
const ProductController = require("../app/controllers/product");

//===========admin================
router.get("/admin",AdminController.index);

//===========Category===============
router.get("/admin/categories",CategoryController.index);
router.get("/admin/categories/create",CategoryController.create);
router.post("/admin/categories/store",CategoryController.store);
router.get("/admin/categories/edit/:id",CategoryController.edit);
router.post("/admin/categories/update/:id",CategoryController.update);
router.post("/admin/categories/delete/:id",CategoryController.dele);
router.post("/admin/categories/reorder",CategoryController.reorder);

//===========Product===============
router.get("/admin/products",ProductController.index);
router.get("/admin/products/create",ProductController.create);
router.post("/admin/products/store",ProductController.store);
router.get("/admin/products/edit/:id",ProductController.edit);
router.post("/admin/products/update/:id",ProductController.update);
router.post("/admin/products/delete/:id",ProductController.dele);


module.exports = router;
