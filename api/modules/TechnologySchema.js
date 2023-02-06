const mongoose = require('mongoose')

const Techonology = new mongoose.Schema({
    title:String,
    icon:String,
    description:String
},
{
  timestamps: true,
})

module.exports = mongoose.model('Techno', Techonology)