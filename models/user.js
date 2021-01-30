const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const Todo = require('./todo');

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
});

// Hash password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Check if email exists
userSchema.pre('save', async function(next){
    if(!this.isModified('email')){
        return next();
    }

    const email = await this.collection.findOne({email: this.email});
    if(email){
        const error = new mongoose.Error('Email already exists!');
        error.statusCode = 400;
        return next(error);
    }
    next();
});


// This {query:false, document: true} is to make sure that `this` refers to the document
// If u wanna it to refer to a query u can just swap the true & false
// if a user gets deleted, it deletes his Todos too.
userSchema.pre('deleteOne', {query: false, document:true}, async function (next) {
    await Todo.deleteMany({creator: this._id});
    next();
});


// Check if email exists
// Throws error if it doesn't Exist
// used in login functionality
userSchema.statics.emailExists = async function (email) {
    const user = await this.findOne({email: email});
    if (!user) {
        const error = new mongoose.Error('Email does\'nt exist!');
        error.statusCode = 404;
        throw error;
    }
    return user;
}


// Check if 2 passwords match
// Throws Error if they don't match
// used in Signup functionality
userSchema.methods.comparePassword = async function (password) {
    const isCorrect = await bcrypt.compare(password, this.password);
    if(!isCorrect){
        const error = new mongoose.Error('Password isn\'t correct!');
        error.statusCode = 400;
        throw error;
    }
    return true;
}


module.exports = mongoose.model('User', userSchema);