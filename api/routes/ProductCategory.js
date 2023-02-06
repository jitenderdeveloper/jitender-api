const express = require("express");
const router = express.Router();
const ProductCategory = require("../modules/ProductCategorySchema");

const authorization = require('../middleware/checkAuth')

router.get("/", (req, res) => {
  try {
    ProductCategory.find().then((result) => {
      res.status(200).json({
        message: "Product Category",
        ProductCategory_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: "Product Category is not working",
    });
  }
});

router.post("/",authorization, (req, res) => {
  try {
    const cate = new ProductCategory({
      title: req.body.title,
    });
    cate.save().then((result) => {
      res.status(200).json({
        message: "New Product Category is Add..",
        ProductCategory_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: "Product Category is not working",
    });
  }
});

router.delete("/:id", authorization,(req, res) => {
  try {
    ProductCategory.deleteOne({ _id: req.params.id }).then((result) => {
      res.status(200).json({
        message: "Product Category is Deleted",
        ProductCategory_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: "Product Category is not working",
    });
  }
});

router.put("/:id",authorization, (req, res) => {
  try {
    ProductCategory.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
        },
      }
    ).then((result) => {
      res.status(200).json({
        message: "Product Category is Updated..",
        ProductCategory_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: "Product Category is not working",
    });
  }
});

module.exports = router;
