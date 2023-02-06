const mongoose = require("mongoose");

const testimon = new mongoose.Schema(
  {
    name:String,
    email:String,
    city:String,
    description:String,
    category:String,
    image:String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("testimonil", testimon);
