const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    todo: {
        type: String,
        required: true,
    },

    done: {
        type: Boolean,
        default: false
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true});


todoSchema.path('todo').validate(todo=>todo.length > 0 , 'TODO can\'t be empty!');

module.exports = mongoose.model('Todo', todoSchema);