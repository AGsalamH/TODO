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

// Update 'updatedAt' everytime i edit a doc 
todoSchema.pre('save', function (next) {
    if(this.isModified('todo') || this.isModified('done')){
        this.updatedAt = Date.now();
        return next();
    }
    next();
});

module.exports = mongoose.model('Todo', todoSchema);