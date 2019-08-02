const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: String,
    category_name: String,
    status: Number,
    images0: String,
    images1: String,
    images2: String,
    images3: String,
    images4: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", ProductSchema);
