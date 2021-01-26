require('dotenv').config();

// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

// Routes Import


const app = express();


// Middlewares
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Routes


(async () =>{
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    console.log('MONGODB Connected ...');

    app.listen(process.env.PORT, ()=> console.log(`Listening on PORT: ${process.env.PORT}`))

})()