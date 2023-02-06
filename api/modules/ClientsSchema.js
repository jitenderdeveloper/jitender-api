const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    title:String,
    logo:String,
},
{
  timestamps: true,
})

module.exports = mongoose.model('Client', ClientSchema)