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

// To be able to throw errors in ternary operator AKA Ta7neka :D
const _throw = err => {
    throw err;
}

module.exports = {
    _throw,
    isMongooseError,
    jwtError,

    MongooseError: mongoose.Error,
}