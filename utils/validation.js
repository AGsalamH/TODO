const {check} = require('express-validator');

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


module.exports = {
    signupValidationRules,
    loginValidationRules,
}