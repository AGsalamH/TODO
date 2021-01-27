const {check, validationResult} = require('express-validator');

const signupValidationRules = () => {
    return [
        check('firstname', 'Can\'t be Empty or < 2 characters').trim().isString().isLength({min: 2}),
        check('lastname', 'Can\'t be Empty or < 2 characters').trim().isString().isLength({min: 2}),
        check('email', 'invalid email format').isEmail(),
        check('password', 'Must be at least 6 characters').trim().isLength({min: 6})
    ]
}

const loginValidationRules = () =>{
    return [
        check('email', 'invalid email format').isEmail(),
        check('password', 'Must be at least 6 characters').isLength({min:6})
    ]
}


// Middleware To catch any Validation Errors
const validate = (req, res, next) =>{
    const errors = validationResult(req);
    
    // If no Errors
    if (errors.isEmpty()) {
        return next();
    }

    // Here  There are Errors 
    // Let's Catch them
    
    // Just formatted the errors a bit 
    // in this array
    const extractedErrors = [];
    errors.array().map(e => extractedErrors.push({[e.param]: e.msg}));
    
    res.status(422).json({
        ok: 0,
        msg: 'Validation Error',
        errors: extractedErrors
    });

}

module.exports = {
    signupValidationRules,
    loginValidationRules,
    validate

}