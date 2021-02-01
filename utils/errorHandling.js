const mongoose = require("mongoose");

// Check if it's a mongoose error
// To catch only mongoose errors
const isMongooseError = err => {
    if(err instanceof mongoose.Error){
        return true;
    }else{
        return false;
    }
}


// Check if it's a Jsonwebtoken error
const jwtError = err => {
    const condition = (
        err.name === 'JsonWebTokenError' ||
        err.name === 'NotBeforeError'    ||
        err.name === 'TokenExpiredError'
    );
    return condition ? true : false;
}


// To be able to throw errors in ternary operator AKA Ta7neka :D
const _throw = err => {
    throw err;
}

// 404 Handling middleware
const urlNotFound = (req, res, next) =>{
    const error = new Error(`The requested URL: ${req.url} was NOT found on this server!`);
    error.statusCode = 404;
    next(error);
}


// Express Global Error Handling middleware
// All Errors are passed directly to it
const globalErrorHandling = (error, req, res, next) =>{
    res
    .status(error.statusCode || 500)
    .json({ok: 0, error: error.message});
}


module.exports = {
    _throw,
    isMongooseError,
    jwtError,

    urlNotFound,
    globalErrorHandling,

    MongooseError: mongoose.Error,
}