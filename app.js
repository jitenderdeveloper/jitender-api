const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// const path = require('path')
// const multer = require('multer');

const ProductRouter = require('./api/routes/product');
const BlogRouter = require('./api/routes/Blog');
const TestimonialRouter = require('./api/routes/Testimonial');
const ProductCategoryRouter = require('./api/routes/ProductCategory');
const BlogCategoryRouter = require('./api/routes/BlogCategory');
const TechnologyRouter = require('./api/routes/Technology')
const ClientRouter = require('./api/routes/Clients')
const YoutubeRouter = require('./api/routes/Youtube')
const ContactRouter = require('./api/routes/Contact')

const UserRouter = require('./api/routes/User')



// --mongoose-connection----
const mongoose = require('mongoose');
const url = 'mongodb+srv://Jitender:39KRJt8Efkcl8nJC@cluster0.gsfnqwy.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', (error)=>{
    console.log('connection failed...')
});
mongoose.connection.on('connected', (connected)=>{
    console.log('connection successfuly...');
});
// --mongoose-connection----



app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())



app.use('/product', ProductRouter)
app.use('/blog', BlogRouter)
app.use('/testimonial', TestimonialRouter)
app.use('/productcategory', ProductCategoryRouter)
app.use('/blogcategory', BlogCategoryRouter)
app.use('/technology', TechnologyRouter)
app.use('/client', ClientRouter)
app.use('/youtubelink', YoutubeRouter)
app.use('/contact', ContactRouter)

app.use('/user', UserRouter)


app.use((req, res)=>{
    res.status(404).json({ 
        error: 'bad request'
    })
})

// 39KRJt8Efkcl8nJC password

module.exports = app;