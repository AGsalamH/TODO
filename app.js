require('dotenv').config();

// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

// Import Routes
const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// Import Middlewares
const {urlNotFound, globalErrorHandling} = require('./middlewares/errorHandling');
const isAuth = require('./middlewares/isAuth');


// Instatiate Express app
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

// Global Error Handling Middleware
app.use(globalErrorHandling);

(async () =>{
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
    console.log('MONGODB Connected ...');

    app.listen(process.env.PORT, ()=> console.log(`Listening on PORT: ${process.env.PORT}`));

})()