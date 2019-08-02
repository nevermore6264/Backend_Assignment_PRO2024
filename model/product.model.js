const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    content: String,
    author: String,
    comments: [ { message: String, commentator: String, date: Date } ],
    key: String,
    date: { type: Date, default: Date.now },
    votes: Number,
    file_upload: {
        images: String,
        videos: String,
    }
}, {
        timestamps: true
    });

module.exports = mongoose.model('Product', ProductSchema);