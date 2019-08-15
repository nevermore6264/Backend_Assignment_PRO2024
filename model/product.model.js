const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: String,
    category_name: String,
    status: Number,
    desc: String,
    images: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", ProductSchema);
