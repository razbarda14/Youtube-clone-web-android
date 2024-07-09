const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const UserModel = new Schema({
    username: {
        type: String,
        required: false},
    password: {
        type: String,
        required: false},
    display_name: {
        type: String,
        required: false},
    image: {
        type: String,
        required: false}
    });
    module.exports = mongoose.model('UsersModel', UserModel);