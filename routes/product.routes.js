var mongoose = require("mongoose");
var multer = require("multer");
var path = require("path");

var upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "./uploads");
    },
    filename: function(req, file, callback) {
      callback(null, file.originalname);
    }
  }),

  fileFilter: function(req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(/*res.end('Only images are allowed')*/ null, false);
    }
    callback(null, true);
  }
});

module.exports = app => {
  const products = require("../controller/product.controller.js");

  // Create a new product
  app.post("/products", upload.any(), products.create);

  // Retrieve all products
  app.get("/products", products.findAll);

  // Retrieve a single product with productId
  app.get("/products/:_id", products.findOne);

  // Update a Note with productId
  app.put("/products/:_id", products.update);

  // Delete a Note with productId
  app.delete("/products/:_id", products.delete);
};
