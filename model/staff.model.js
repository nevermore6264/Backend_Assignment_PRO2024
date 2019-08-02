const mongoose = require("mongoose");

const StaffSchema = mongoose.Schema(
  {
    username: String,
    fullname: String,
    email: String,
    password: String,
    birthday: Date,
    phone: String,
    identification: String,
    address: String,
    permanent_address: String,
    created_date: String,
    created_address: String,
    avatar: String,
    gender: Boolean,
    role: Boolean
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Staff", StaffSchema);
