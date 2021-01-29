const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const contextService = require('request-context');

const todoSchema = new Schema({
    todo: {
        type: String,
        required: [true, 'Can\'t be empty'],
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

// Update 'updatedAt' everytime i edit a doc 
todoSchema.pre('save', function (next) {
    if(this.isModified('todo') || this.isModified('done')){
        this.updatedAt = Date.now();
        return next();
    }
    next();
});

module.exports = mongoose.model('Todo', todoSchema);