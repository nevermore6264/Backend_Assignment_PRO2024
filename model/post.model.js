const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    content: String,
    author: String,
    comments: [ { message: String, commentator: String, date: Date } ],
    date: { type: Date, default: Date.now },
    votes: Number,
    attachments: {
        images: String,
        videos: String,
    }
}, {
        timestamps: true
    });

module.exports = mongoose.model('Post', PostSchema);