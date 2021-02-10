const jwt = require('jsonwebtoken');
const {jwtError,isMongooseError, _throw} = require('../utils/errorHandling');
const User = require('../models/user');

// Protect routes and make sure user is logged in
// Authorization
module.exports = async (req, res, next) =>{
    const token = req.get('auth-token');
    try {
        if(!token){
            const error = new jwt.JsonWebTokenError('Access-denied');
            error.statusCode = 401;
            throw error;
        }
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(verified._id);
        if(!user){
            const error = new jwt.JsonWebTokenError('User not found!');
            error.statusCode = 404;
            throw error;
        }
        req.user = verified;
        next();
    } catch (err) {
        jwtError(err) || isMongooseError(err) ? next(err) : _throw(err);
    }  
}