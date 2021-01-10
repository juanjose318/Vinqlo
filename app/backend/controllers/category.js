const User = require("../models/user");
const Community = require("../models/post");
const Category = require("../models/category");

exports.getCategories = async (req, res) => {
  const categories = await Category.find()
    .then((categoryResults) => {
      res.status(200).json({
        message: "Categories fetched",
        categories: categoryResults,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching categories failed",
        error: err,
      });
    });
};

exports.getCategory = async (req, res) => {
  categoryId = req.params.id;
  const category = Category.findOne({ categoryId })
    .then((categoryResults) => {
      res.status(200).json({
        message: "Categories fetched",
        category: categoryResults,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching category failed",
        error: err,
      });
    });
};

exports.deleteCategory = async (req, res) => {
  categoryId = req.params.id;
  const category = await Category.deleteOne({ categoryId })
    .then((categoryResults) => {
      if (categoryResults.n > 0) {
        res.status(200).json({
          message: "Categories deleted succesfully",
          category: categoryResults,
        });
      } else {
        res.status(401).json({
          message: "Not authorized",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Deleting category failed",
        error: err,
      });
    });
};

exports.createCategory = async (req, res) => {
  const category = await new Category({
    name: req.body.name,
  });

  category
    .save()
    .then((createdCategory) => {
      res.status(201).json({
        message: "Category created Succesfully",
        category: createdCategory,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Creating a category failed" + err,
      });
    });
};

exports.updateCategory = async (req, res) => {
  const category = {
    name: req.body.name,
    isMandatory: req.body.isMandatory,
    icon: req.body.icon
  };

  Category.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    category
  )
    .then((updatedCategory) => {
      res.status(201).json({
        message: "Category updated Succesfully",
        category: updatedCategory,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Creating a category failed",
      });
    });
};
