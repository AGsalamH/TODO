const Todo = require('../models/todo');
const validId = require('../utils/isValid');

const {MongooseError, isMongooseError, _throw} = require('../utils/errorHandling');
const isValid = require('../utils/isValid');

// helper method to keep our code DRY
const todoNotFound = () =>{
    const error = new MongooseError('No todo found!');
    error.statusCode = 404;
    throw error;
}

// GET /todos
const getTodos = async (req, res, next) =>{
    try {
        const todos = await Todo.find({creator: req.user});
        res.json({ok: 1, todos});
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}

// GET /todos/:id
const getTodo = async (req, res, next) =>{
    try {
        const id = isValid(req.params.id);
        const todo = await Todo.findById(id);
        if(!todo){
            todoNotFound();
        }
        res.json({
            ok: 1,
            todo
        })
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err)
    }
}

// POST /todos
const createTodo = async (req, res, next) =>{
    try {
        const todo = new Todo({
            todo: req.body.todo,
            creator: req.user
        });
        const savedTodo = await todo.save();
        res.status(201).json({
            ok: 1,
            todo: savedTodo
        });
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}

// PUT /todos/:id
const updateTodo = async (req, res, next) =>{
    try {
        const id = validId(req.params.id);
        const todo = await Todo.findOne({_id: id, creator: req.user});
        if (!todo) {
            todoNotFound();
        }
        todo.todo = req.body.todo || todo.todo;
        todo.done = req.body.done || false;
        const savedTodo = await todo.save(); 
        res.json({
            ok: 1,
            todo: savedTodo
        })
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}
// DELETE /todos/:id
const deleteTodo = async (req, res, next) =>{
    try {
        const id = validId(req.params.id);
        const todo = await Todo.findOne({_id: id, creator: req.user});
        if(!todo){
            todoNotFound();
        }
        deleteInfo = await Todo.deleteOne({_id: req.params.id});
        res.json({
            ok: 1,
            deleteInfo
        })
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}

// DELETE /todos
const deleteAllTodos = async (req, res, next) =>{
    try {
        deleteInfo = await Todo.deleteMany({creator: req.user});
        res.json({
            ok: 1,
            deleteInfo
        });
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}


module.exports = {
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo,
    deleteAllTodos
}