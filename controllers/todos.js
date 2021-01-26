const Todo = require('../models/todo');


const todoNotFound = () =>{
    const error = new Error('No todo found!');
    error.statusCode = 404;
    throw error;
}

const getTodos = async (req, res, next) =>{
    try {
        const todos = await Todo.find({creator: req.user});
        res.json({ok: 1, todos});
    } catch (error) {
        next(error);
    }
}

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
    } catch (error) {
        next(error);
    }
}

const updateTodo = async (req, res, next) =>{
    try {
        const todo = await Todo.findOne({_id: req.params.id, creator: req.user});
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
    } catch (error) {
        next(error);
    }
}

const deleteTodo = async (req, res, next) =>{
    try {
        const todo = await Todo.findOne({_id: req.params.id, creator: req.user});
        if(!todo){
            todoNotFound();
        }
        deleteInfo = await Todo.deleteOne({_id: req.params.id});
        res.json({
            ok: 1,
            deleteInfo
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
}