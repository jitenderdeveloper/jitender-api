const mongoose = require('mongoose')

const ProductCategories = new mongoose.Schema({
    title:String,
},
{
  timestamps: true,
})

module.exports = mongoose.model('ProductCategory', ProductCategories)