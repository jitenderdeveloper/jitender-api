const mongoose = require('mongoose')

const YoutubeShcema = new mongoose.Schema({
    title:String,
    video:String,
    description:String
},
{
  timestamps: true,
})

module.exports = mongoose.model('YoutubeLink', YoutubeShcema)