const express = require("express");
const router = express.Router();
const Youtubelink = require("../modules/YoutubeSchema");

const authorization = require('../middleware/checkAuth')

router.get("/", (req, res) => {
  try {
    Youtubelink.find().then((result) => {
      res.status(200).json({
        message: "Youtube link details",
        Youtubelink_list: result,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "Youtubelink GET is not working..",
    });
  }
});

router.post("/", authorization,(req, res) => {
  const Youtubeadd = new Youtubelink({
    title: req.body.title,
    video: req.body.video,
    description: req.body.description,
  });
  Youtubeadd.save()
    .then((result) => {
      res.status(200).json({
        Toutube_List: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: "Youtubelink is not working...",
      });
    });
});

router.get("/:id", authorization, (req, res) => {
  try {
    Youtubelink.findById({ _id: req.params.id }).then((result) => {
      res.status(200).json({
        message: `find this ${result.id}`,
        Youtubelink_list: result,
      });
    });
  } catch (error) {
    res.status(200).json({
      error: "Youtubelink id not working",
    });
  }
});

router.delete("/:id", authorization, (req, res) => {
  try {
    Youtubelink.deleteOne({ _id: req.params.id }).then((result) => {
      res.status(200).json({
        message: "Delete your Youtubelink",
        Youtubelink_list: result,
      });
    });
  } catch (error) {
    res.status(200).json({
      error: "Youtubelink id not working",
    });
  }
});

router.put("/:id", authorization, (req, res) => {
  try {
    Youtubelink.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          video: req.body.video,
          description: req.body.description,
        },
      }
    ).then((result) => {
      res.status(200).json({
        message: "Updated your Youtubelink",
        Youtubelink_list: result,
      });
    });
  } catch (error) {
    res.status(200).json({
      error: "Youtubelink id not working",
    });
  }
});

module.exports = router;
