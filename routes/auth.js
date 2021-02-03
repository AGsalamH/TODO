const router = require('express'). Router();
const {login, signup} = require('../controllers/auth');
const {loginValidationRules, signupValidationRules} = require('../utils/validation');
const validate = require('../middlewares/validate');

/*
    - POST /login
    - POST /signup
*/
router.post('/login',loginValidationRules(), validate, login);
router.post('/signup',signupValidationRules(), validate, signup);

module.exports = router;