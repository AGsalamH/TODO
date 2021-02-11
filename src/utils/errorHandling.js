const mongoose = require("mongoose");

// Check if it's a mongoose error
// To catch only mongoose errors
const isMongooseError = err => {
    return err instanceof mongoose.Error;
}

// Check if it's a Jsonwebtoken error
const jwtError = err => {
    const filter = (
        err.name === 'JsonWebTokenError' ||
        err.name === 'NotBeforeError'    ||
        err.name === 'TokenExpiredError'
    );
    return filter;
}

const throwTodoError = (next, status = 404, message = 'Todo not found!') =>{
    const error = new Error(message);
    error.statusCode = status;
    return next(error);
}

const throwUserError = (next, status = 404, message = 'User not found!') =>{
    const error = new Error(message);
    error.statusCode = status;
    return next(error);
}

// To be able to throw errors in ternary operator AKA Ta7neka :D
const _throw = err => {
    throw err;
}

module.exports = {
    _throw,

    isMongooseError,
    jwtError,

    throwTodoError,
    throwUserError,

    MongooseError: mongoose.Error,
}