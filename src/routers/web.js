const express = require("express");
const router = require('express-promise-router')()

//Goi controllers
const CategoryController = require("../app/controllers/category");

//===========Category===============
router.get("/admin/categories",CategoryController.index);
  
router.get("/admin/categories/create",CategoryController.create);
  
router.get("/admin/categories/edit/:id",CategoryController.edit);
  
router.get("/admin/categories/delete/:id",CategoryController.dele);

module.exports = router;
