const mongoose = require('mongoose')

const BlogCategorySchema = new mongoose.Schema({
    title:String,
},
{
  timestamps: true,
})

module.exports = mongoose.model('BlogCategory', BlogCategorySchema)