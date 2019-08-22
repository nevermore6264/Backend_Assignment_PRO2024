const mongoose = require("mongoose");

const Revenue_Expenditure = mongoose.Schema(
    {
        date: Date,
        staff_id: String,
        customer_id: String,
        revenue: Number,
        expenditure: Number,
        total_money: Number
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("revenue_expenditure", Revenue_Expenditure);