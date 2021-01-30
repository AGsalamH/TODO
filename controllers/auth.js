const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {isMongooseError, jwtError, _throw} = require('../utils/errorHandling');
// POST /login
const login = async (req, res, next) =>{
    try {
        const user = await User.emailExists(req.body.email);
        await user.comparePassword(req.body.password);
        const token = jwt.sign({
            _id: user._id,
            email: user.email
        }, process.env.TOKEN_SECRET);
        res.setHeader('auth-token', token);
        res.json({
            ok: 1,
            msg: 'You\'re logged in now'
        });
        
    } catch (error) {
        jwtError(error) || isMongooseError(error) ? next(error) : _throw(error);
    }
}

// POST /signup
const signup = async (req, res, next) =>{
    try {
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        });
        const savedUser = await user.save();
        res.status(201).json({
            ok: 1,
            user: savedUser
        });

    } catch (error) {
        isMongooseError(error) ? next(error) : _throw(error);
    }
}



module.exports = {
    login,
    signup
}