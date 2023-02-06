const express = require("express");
const router = express.Router();
const Testimonial = require("../modules/TestimonialSchema");

const authorization = require('../middleware/checkAuth')

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/Testimonials/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/svg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: fileFilter,
// });

router.post("/", (req, res) => {
  console.log("image file ->", req.file);
  const Testimoni = new Testimonial({
    name: req.body.name,
    email: req.body.email,
    city: req.body.city,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
  });
  Testimoni.save()
    .then((result) => {
      res.status(200).json({
        Tstimonial_List: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "New Testimonial is Update..",
        error: "POST Testimonial Schema is not working...",
      });
    });
});

router.get("/", (req, res) => {
  try {
    Testimonial.find().then((result) => {
      res.status(200).json({
        Testimonial_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "Testimonials GET is not working..",
    });
  }
});

router.get("/:id", authorization,(req, res) => {
  try {
    Testimonial.findById({ _id: req.params.id }).then((result) => {
      res.status(200).json({
        message: `find this ${result.id}`,
        Testimonial_list: result,
      });
    });
  } catch (error) {
    res.status(200).json({
      error: "Testimonial id not working",
    });
  }
});

router.delete("/:id", authorization,(req, res) => {
  try {
    Testimonial.deleteOne({ _id: req.params.id }).then((result) => {
      res.status(200).json({
        message: "Delete your Testimonial",
        Testimonial_list: result,
      });
    });
  } catch (error) {
    res.status(200).json({
      error: "Testimonial id not working",
    });
  }
});

router.put("/:id",authorization,(req, res) => {
  try {
    Testimonial.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          city: req.body.city,
          description: req.body.description,
          category: req.body.category,
          image: req.body.image,
        },
      }
    ).then((result) => {
      res.status(200).json({
        message: "Updated your Testimonial",
        Testimonial_list: result,
      });
    });
  } catch (error) {
    res.status(200).json({
      error: "Testimonial id not working",
    });
  }
});

module.exports = router;
