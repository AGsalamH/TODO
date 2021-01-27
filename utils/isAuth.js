// Protect routes and make sure user is logged in
// Authorization
module.exports = (req, res, next) =>{
    const token = req.get('auth-token');
    try {
        if(!token){
            const error = new Error('Access-denied');
            error.statusCode = 401;
            throw error;
        }
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        next(error);
    }  
}