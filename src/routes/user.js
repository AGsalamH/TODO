const router = require('express').Router();
const usersController = require('../controllers/users');
const {editUserInfoRules} = require('../utils/validation');
const validate = require('../middlewares/validate');


/*
    - GET /users
    - DELETE /users
    - PUT /users
*/

router.get('/', usersController.getUserInfo);
router.delete('/', usersController.deleteUser);
router.put('/', editUserInfoRules(), validate, usersController.editUser);


module.exports = router;