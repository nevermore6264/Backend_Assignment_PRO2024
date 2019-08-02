const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema(
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
    description: {
      me: {
        job: String,
        salary: Number,
        company: String,
        contact_people: String,
        contact_phone: String
      },
      other: {
        father_name: String,
        father_phone: String,
        mother_name: String,
        mother_phone: String
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Customer", CustomerSchema);
