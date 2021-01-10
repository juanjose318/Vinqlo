const express = require("express");
const router = express.Router();

const Category = require("../models/category");
const CategoryController = require("../controllers/category");
const checkAuth = require("../middleware/check-auth");

router.get("", CategoryController.getCategories);

router.post("",  CategoryController.createCategory);

router.get("/:id", CategoryController.getCategory);

router.delete("/:id", checkAuth, CategoryController.deleteCategory);

router.put("/:id",  CategoryController.updateCategory);

module.exports = router;
