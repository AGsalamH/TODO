const User = require('../models/user');
const {MongooseError,isMongooseError, _throw} = require('../utils/errorHandling');

// Helper method
const userNotFound = () =>{
    const error = new MongooseError('No user found');
    error.statusCode = 404;
    throw error;
}

// GET /users
const getUserInfo = async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.user}, {password: 0});
        if(!user){
            userNotFound();
        }
        res.json({
            ok: 1,
            user
        });
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}


// When Deleting a user use `doc.deleteOne()` NOT `Model.deleteOne()` ..
// To fire the pre hook that deletes the Todos attached to that user
// DELETE /users
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.user._id}, {password: 0});
        if(!user){
            userNotFound();
        }
        const deletedUser = await user.deleteOne();
        res.json({
            ok: 1,
            user: deletedUser
        });

    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}

// PUT /users
const editUser = async (req, res, next) =>{
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            userNotFound();
        }
        user.firstname = req.body.firstname || user.firstname;
        user.lastname = req.body.lastname || user.lastname;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const savedUser = await user.save();
        res.json({
            ok: 1,
            user: savedUser
        })
    } catch (error) {
        isMongooseError(error) ? next(error) : _throw(error);
    }
}

module.exports = {
    getUserInfo,
    deleteUser,
    editUser
}