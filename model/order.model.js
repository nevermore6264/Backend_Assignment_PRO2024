const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    customer_id: String,
    product_id: String,
    staff_id: String,
    created_date: String,
    loan: Number, //Số tiền vay
    interest_rate: Number, //Lãi
    interest: Number, // Tiền lãi
    month: Number, // Số tháng vay
    total_loan: Number,
    status: { type: Number, default: 0 } //Trạng thái thanh toán
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", OrderSchema);
