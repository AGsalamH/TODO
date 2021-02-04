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

// Add optional({nullable: true}), So U don't have to edit all user info everytime
// Just the field U wanna edit
const editUserInfoRules = () => {
    return [
        check('firstname', 'Can\'t be Empty or < 2 characters').optional({nullable: true}).trim().isString().isLength({min: 2}),
        check('lastname', 'Can\'t be Empty or < 2 characters').optional({nullable: true}).trim().isString().isLength({min: 2}),
        check('email', 'invalid email format').optional({nullable: true}).isEmail(),
        check('password', 'Must be at least 6 characters').optional({nullable: true}).trim().isLength({min: 6})
    ]
}


module.exports = {
    signupValidationRules,
    loginValidationRules,
    editUserInfoRules
}