const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
    username: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    display_name: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('UserModel', UserModelSchema);
