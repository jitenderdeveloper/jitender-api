const express = require("express");
const router = express.Router();
const BlogCategory = require("../modules/BlogCategorySchema");

const authorization = require('../middleware/checkAuth')

router.get("/",authorization, (req, res) => {
  try {
    BlogCategory.find().then((result) => {
      res.status(200).json({
        message: "Product Category",
        BlogCategory_list: result,
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
    const cate = new BlogCategory({
      title: req.body.title,
    });
    cate.save().then((result) => {
      res.status(200).json({
        message: "New Product Category is Add..",
        BlogCategory_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: "Product Category is not working",
    });
  }
});

router.delete("/:id", authorization, (req, res) => {
  try {
    BlogCategory.deleteOne({ _id: req.params.id }).then((result) => {
      res.status(200).json({
        message: "Product Category is Deleted",
        BlogCategory_list: result,
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
    BlogCategory.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
        },
      }
    ).then((result) => {
      res.status(200).json({
        message: "Product Category is Updated..",
        BlogCategory_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: "Product Category is not working",
    });
  }
});

module.exports = router;
