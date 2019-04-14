const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    content: String,
    author: String,
    comments: [{ message: String, commentator: String, date: Date }],
    date: { type: Date, default: Date.now },
    meta: {
        votes: Number,
        favs: Number
    }
}, {
        timestamps: true
    });

module.exports = mongoose.model('Post', PostSchema);