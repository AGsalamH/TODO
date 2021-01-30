const jwt = require('jsonwebtoken');
const {jwtError, _throw} = require('./errorHandling');
// Protect routes and make sure user is logged in
// Authorization
module.exports = (req, res, next) =>{
    const token = req.get('auth-token');
    try {
        if(!token){
            const error = new jwt.JsonWebTokenError('Access-denied');
            error.statusCode = 401;
            throw error;
        }
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        jwtError(error) ? next(error) : _throw(error);
    }  
}