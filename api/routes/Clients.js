const express = require("express");
const router = express.Router();
const Client = require("../modules/ClientsSchema");

const authorization = require('../middleware/checkAuth')

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/Clients/");
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

router.post("/", authorization, (req, res) => {
  // console.log("image file ->", req.file);
  try {
    const clientData = new Client({
      title: req.body.title,
      logo: req.body.logo,
    });
    clientData.save().then((result) => {
      res.status(200).json({
        message: "New Client is Add..",
        Client_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: "Client route is not working...",
    });
  }
});

router.get("/", (req, res) => {
  try {
    Client.find().then((result) => {
      res.status(200).json({
        message: "Client list",
        Client_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: "Client route is not working...",
    });
  }
});

router.delete("/:id", authorization, (req, res) => {
  try {
    Client.deleteOne({ _id: req.params.id }).then((result) => {
      res.status(200).json({
        message: "One Client is Deleted..",
        Client_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: "Client route is not working...",
    });
  }
});

router.get("/:id", authorization, (req, res) => {
  try {
    Client.findById({ _id: req.params.id })
      .then((result) => {
      res.status(200).json({
        message: "One Client is find..",
        Client_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: "Client route is not working...",
    });
  }
});

// upload.single("clientimg"), 
// logo: req.file.path,

router.put("/:id",authorization, (req, res) => {
  // console.log('put data ->', req.file);
  try {
    Client.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          logo: req.body.logo,
        },
      }
    ).then((result) => {
      res.status(200).json({
        message: "Client is Updated..",
        Client_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: "Client route is not working...",
    });
  }
});

module.exports = router;
