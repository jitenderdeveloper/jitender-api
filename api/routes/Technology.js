const express = require("express");
const router = express.Router();
const Technology = require("../modules/TechnologySchema");

const authorization = require('../middleware/checkAuth')

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/Technologies/");
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
  try {
    const techData = new Technology({
      title: req.body.title,
      icon: req.body.icon,
      description: req.body.description,
    });
    techData.save().then((result) => {
      res.status(200).json({
        message: "New Technology is Add..",
        Technology_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: "Technology route is not working...",
    });
  }
});



router.get("/", (req, res) => {
  try {
    Technology.find().then((result) => {
      res.status(200).json({
        message: "Technology list",
        Technology_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: "Technology route is not working...",
    });
  }
});

router.get("/:id", (req, res) => {
  try {
    Technology.findById({_id: req.params.id}).then((result) => {
      res.status(200).json({
        message: "Technology list",
        Technology_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: "Technology route is not working...",
    });
  }
});


router.delete("/:id", authorization, (req, res) => {
  try {
    Technology.deleteOne({ _id: req.params.id }).then((result) => {
      res.status(200).json({
        message: "One Technology is Deleted..",
        Technology_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: "Technology route is not working...",
    });
  }
});

router.put("/:id", authorization, (req, res) => {
  try {
    Technology.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          icon: req.body.icon,
          description: req.body.description,
        },
      }
    ).then((result) => {
      res.status(200).json({
        message: "Technology is Updated..",
        Technology_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: "Technology route is not working...",
    });
  }
});

module.exports = router;
