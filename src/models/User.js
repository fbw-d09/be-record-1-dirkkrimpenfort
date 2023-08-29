const {Schema, model} = require('mongoose');
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String});
    const userModel = new model('User', userSchema, 'users');
    module.exports = userModel;

    