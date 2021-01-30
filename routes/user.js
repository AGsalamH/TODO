const router = require('express').Router();
const usersController = require('../controllers/users');

/*
    - GET /users
    - DELETE /users
*/

router.get('/', usersController.getUserInfo);
router.delete('/', usersController.deleteUser);


module.exports = router;