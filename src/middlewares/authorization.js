const jwt = require('jsonwebtoken');
const {jwtError,isMongooseError, throwAccessDenied, _throw, throwUserError} = require('../utils/errorHandling');
const User = require('../models/user');

// Protect routes and make sure user is logged in
// Authorization
module.exports = (...roles) =>{
    return async (req, res, next) =>{
        const token = req.get('auth-token');
        try {
            if(!token){
                return throwAccessDenied(next);
            }
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            
            const user = await User.findById(verified._id);
            if(!user){
                return throwUserError(next);
            }
            
            if(!roles.includes(verified.role)){
                return throwAccessDenied(next);
            }

            req.user = verified;
            next();
        } catch (err) {
            jwtError(err) || isMongooseError(err) ? next(err) : _throw(err);
        }  
    }
}