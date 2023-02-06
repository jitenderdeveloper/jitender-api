const express = require('express')
const router = express.Router()
const contact = require('../modules/ContactSchema')

const authorization = require('../middleware/checkAuth')



router.post('/', (req, res) =>{
    try {
        const contactData = new contact({
            name: req.body.name,
            email: req.body.email,
            location: req.body.location,
            subscribe: req.body.subscribe,
            comment: req.body.comment
        })
        contactData.save()
        .then((result) =>{
            res.status(200).json({
                message: 'Contact us list ...',
                Contact_list: result
            })
        })
    } catch (error) {
        res.status(400).json({
            error: 'contact is not working...'
        })
    }
})


router.get('/',authorization,(req, res) =>{
    try {
        contact.find()
        .then((result) =>{
            res.status(200).json({
                message: 'Contact us list ...',
                Contact_list: result
            })
        })
    } catch (error) {
        res.status(400).json({
            error: 'contact is not working...'
        })
    }
})

router.get('/:id',authorization,(req, res) =>{
    try {
        contact.findById({_id: req.params.id})
        .then((result) =>{
            res.status(200).json({
                message: 'Contact us list ...',
                Contact_list: result
            })
        })
    } catch (error) {
        res.status(400).json({
            error: 'contact is not working...'
        })
    }
})

router.delete('/:id',authorization, (req, res) =>{
    try {
        contact.deleteOne({_id: req.params.id})
        .then((result) =>{
            res.status(200).json({
                message: 'Contact is deleted ...',
                Contact_list: result
            })
        })
    } catch (error) {
        res.status(400).json({
            error: 'contact is not working...'
        })
    }
})

// router.put('/:id', authorization,(req, res) =>{
//     try {
//     contact.findByIdAndUpdate({_id: req.params.id},{
//         $set:{
//             name: req.body.name,
//             email: req.body.email,
//             location: req.body.location,
//             subscribe: req.body.subscribe,
//             comment: req.body.comment
//         }
//     })
//     .then((result) =>{
//         res.status(200).json({
//             message: 'Contact is Updated ...',
//             Contact_list: result
//         })
//     })
//     } catch (error) {
//         res.status(400).json({
//             error: 'contact is not working...'
//         })
//     }
// })


module.exports = router;