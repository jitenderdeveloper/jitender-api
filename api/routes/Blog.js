const express = require("express");
const router = express.Router();
const Blog = require("../modules/BlogSchema");
const authorization = require('../middleware/checkAuth')

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/Blogs/");
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


router.post("/", authorization,(req, res) => {
  // console.log("image file ->", req.file);
  try {
    const blog = new Blog({
      title: req.body.title,
      category: req.body.category,
      image: req.body.image,
      description: req.body.description,
      desc_list: req.body.desc_list
    });
    blog.save().then((result) => {
      res.status(200).json({
        message: "POST Blog is Done..",
        Blog_List: result,
      });
    });
  } catch (error) {}
});


router.get("/", (req, res) => {
  try {
    Blog.find().then((result) => {
      res.status(200).json({
        message: "Fetch Data",
        Blog_List: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "GET Blog is not working...",
    });
  }
});

router.get("/:id",authorization, (req, res) => {
  try {
    Blog.findById({_id: req.params.id})
      .then((result) => {
      res.status(200).json({
        message: "Fetch Data",
        Blog_List: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "GET Blog is not working...",
    });
  }
});



router.delete("/:id",authorization, (req, res) => {
  try {
    Blog.remove({ _id: req.params.id }).then((result) => {
      res.status(200).json({
        message: "Blog is Remove.",
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "Blog is not remove working...",
    });
  }
});

router.put("/:id",authorization,(req, res) => {
  try {
    Blog.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          category: req.body.category,
          image: req.body.image,
          description: req.body.description,
          desc_list: req.body.desc_list
        },
      }
    ).then((result) => {
      res.status(200).json({
        message: `This Blog ${result._id} is Updated.`,
        Blog_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "Blog is not updated working...",
    });
  }
});

module.exports = router;
