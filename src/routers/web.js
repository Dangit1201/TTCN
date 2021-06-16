const express = require("express");
const router = require('express-promise-router')()

//Goi controllers
const CategoryController = require("../app/controllers/category");
const AdminController = require("../app/controllers/admin");
//===========admin================
router.get("/admin",AdminController.index);
//===========Category===============
router.get("/admin/categories",CategoryController.index);
  
router.get("/admin/categories/create",CategoryController.create);

router.post("/admin/categories/store",CategoryController.store);
  
router.get("/admin/categories/edit/:id",CategoryController.edit);
  
router.post("/admin/categories/delete/:id",CategoryController.dele);

router.post("/admin/categories/reorder",CategoryController.reorder);

module.exports = router;
