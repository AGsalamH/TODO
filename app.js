require('dotenv').config();

// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

// Routes Import
const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


// Utils Import
const {urlNotFound} = require('./utils/errorHandling');

// This middleware makes sure that user is logged in
// use it before the routes you wanna protect
const isAuth = require('./utils/isAuth');


const app = express();


// Middlewares
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Routes
app.use('/', authRoutes);
app.use('/todos',isAuth, todoRoutes);
app.use('/users', isAuth, userRoutes);

// 404 Handling
// Must be beneath all Routes
app.use(urlNotFound);

// Error Handling
app.use((error, req, res, next)=>{
    res
    .status(error.statusCode || 500)
    .json({ok: 0, error: error.message});
});

(async () =>{
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
    console.log('MONGODB Connected ...');

    app.listen(process.env.PORT, ()=> console.log(`Listening on PORT: ${process.env.PORT}`));

})()