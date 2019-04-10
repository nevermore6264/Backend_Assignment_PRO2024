const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    content: String,
    author: String,
    key: String,
    like: Number,
    comments: [{ message: String,commentator: String}],
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);