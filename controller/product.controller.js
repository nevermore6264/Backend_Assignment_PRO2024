const Product = require("../model/product.model.js");

//Create new Product
exports.create = (req, res, next) => {
  // Request validation
  if (!req.body) {
    return res.status(400).send({
      message: "Product content can not be empty"
    });
  }
  console.log("clicked");

  // Create a Product
  const product = new Product({
    name: req.body.name,
    category_name: req.body.category_name,
    status: req.body.status,
    desc: req.body.desc,
    images: req.files ? req.files[0].filename : "images.png"
  });

  // Save Product in the database
  product
    .save()
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the product."
      });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
  Product.find()
    .then(products => {
      res.send(products);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving products."
      });
    });
};

// Find a single product with a _id
exports.findOne = (req, res) => {
  Product.findOne({ _id: req.params._id })
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with _id " + req.params._id
        });
      }
      res.send(product);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with _id " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Something wrong retrieving product with _id " + req.params._id
      });
    });
};

// Update a product
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Product content can not be empty"
    });
  }

  // Find and update product with the request body
  Product.findOneAndUpdate(
    { _id: req.params._id },
    {
      name: req.body.name,
      category_name: req.body.category_name,
      status: req.body.status,
      desc: req.body.desc
      //   images: res.file.path
    },
    { new: true }
  )
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with _id " + req.params._id
        });
      }
      res.send(product);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with _id " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Something wrong updating note with _id " + req.params._id
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Product.findOneAndRemove({ _id: req.params._id })
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with _id " + req.params._id
        });
      }
      res.send({ message: "Product deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Product not found with _id " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Could not delete product with _id " + req.params._id
      });
    });
};
