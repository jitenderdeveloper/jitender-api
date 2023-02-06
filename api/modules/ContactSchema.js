const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    name:String,
    email:String,
    location:String,
    subscribe: String,
    comment:String
},
{
  timestamps: true,
})

module.exports = mongoose.model('Contact', ContactSchema)