const {isValid} = require('mongoose').Types.ObjectId;

// Chechk if it's a valid Object id or throw error
module.exports = (id, message = 'Todo not found!') => {
    if(!isValid(id)){
        const error = new Error(message);
        error.statusCode = 400;
        throw error;
    }
    return id;
}