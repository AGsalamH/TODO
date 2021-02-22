// Dependencies
const express = require('express');
const logger = require('morgan');

// Import Routes
const todoRoutes = require('./routes/todo');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// Import Middlewares
const {urlNotFound, globalErrorHandling} = require('./middlewares/errorHandling');
const authorization = require('./middlewares/authorization');


// Instatiate Express app
const app = express();


// Middlewares
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Routes
app.use('/', authRoutes);
app.use('/todos',authorization("user"), todoRoutes);
app.use('/users',authorization("user"), userRoutes);

// 404 Handling
// Must be beneath all Routes
app.use(urlNotFound);

// Global Error Handling Middleware
app.use(globalErrorHandling);

module.exports = app;