const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    age: Number,
    avatar: String,
    gender: Boolean,
}, {
        timestamps: true
    });

module.exports = mongoose.model('User', UserSchema);