const router = require('express'). Router();
const todoController = require('../controllers/todos');

/*
    - GET /todos
    - POST /todos
    - PUT /todos/:id
    - DELETE /todos/:id

*/
router.get('/', todoController.getTodos)
router.post('/', todoController.createTodo)
router.put('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodo)


module.exports = router;