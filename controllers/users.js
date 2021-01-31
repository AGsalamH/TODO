const User = require('../models/user');
const {MongooseError,isMongooseError, _throw} = require('../utils/errorHandling');


const userNotFound = () =>{
    const error = new MongooseError('No user found');
    error.statusCode = 404;
    throw error;
}

const getUserInfo = async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.user}, {password: 0});
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

module.exports = {
    getUserInfo,
    deleteUser
}