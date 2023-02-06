const mongoose = require("mongoose");

const blog = new mongoose.Schema(
  {
    title: String,
    category: String,
    image: String,
    description: String,
    desc_list: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blog);