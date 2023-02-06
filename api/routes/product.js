const express = require("express");
const router = express.Router();
const Product = require("../modules/ProductSchema");

const authorization = require('../middleware/checkAuth')

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/Products/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg') {
//     cb(null, true);
//   }else{
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter:fileFilter
// });



router.post("/",authorization, (req, res) => {
  // console.log("image file ->", req.file);
  const Products = new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    logo: req.body.logo,
    category: req.body.category,
    link: req.body.link,
  });
  Products.save()
    .then((result) => {
      res.status(200).json({
        Product_List: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: "POST Product Schema is not working...",
      });
    });
});



router.get("/", (req, res) => {
  try {
    Product.find()
    .then((result) => {
      res.status(200).json({
        Product_List: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      error: "GET Product Schema is not working...",
    });
  }
});

router.get("/:id", (req, res) => {
  try {
    Product.findById({_id: req.params.id})
    .then((result) => {
      res.status(200).json({
        Product_List: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      error: "GET Product Schema is not working...",
    });
  }
});


router.delete("/:id",authorization, (req, res) => {
  Product.remove({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "Product is Remove",
        Product_List: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: "DELETE Product Schema is not working...",
      });
    });
});


router.put("/:id",authorization,(req, res) => {
  Product.findByIdAndUpdate({ _id: req.params.id },{
      $set: {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        logo: req.body.logo,
        category: req.body.category,
        link: req.body.link,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "Product is Updated...",
        Product_List: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: "PUT Product Schema is not working...",
      });
    });
});

module.exports = router;
