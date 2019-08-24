const mongoose = require("mongoose");

const Revenue_Expenditure = mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    staff_id: String,
    money: Number,
    status: Boolean
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("revenue_expenditure", Revenue_Expenditure);
