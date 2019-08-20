const mongoose = require('mongoose');

const CapitalSchema = mongoose.Schema({
    staff_id:String,
    money:Number,

},{
    timestamps: true
});

module.exports = mongoose.model('Capital',CapitalSchema);