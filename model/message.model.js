const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    customer_id: String,
    staff_id: String,
    customer_phone: String,
    staff_phone: String,
    created_date: { type: Date, default: Date.now },
    context: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Message", MessageSchema);
