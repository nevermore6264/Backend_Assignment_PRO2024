const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema(
  {
    fullname: String,
    email: String,
    birthday: Date,
    phone: String,
    identification: String,
    address: String,
    permanent_address: String,
    created_date: String,
    created_address: String,
    avatar: String,
    gender: Boolean,
    description: {
      job: String,
      salary: Number,
      company: String,
      contact_people: String,
      contact_phone: String,
      father_name: String,
      father_phone: String,
      mother_name: String,
      mother_phone: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Customer", CustomerSchema);
