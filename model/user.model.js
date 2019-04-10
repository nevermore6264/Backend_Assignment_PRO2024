const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    avatar: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);