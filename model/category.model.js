const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    key: String,
    name: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);