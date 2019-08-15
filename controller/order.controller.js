const Order = require("../model/order.model.js");

//Create new Order
exports.create = (req, res) => {
  // Request validation
  if (!req.body) {
    return res.status(400).send({
      message: "Order can not be empty"
    });
  }

  // Create a Order
  const order = new Order({
    customer_id: req.body.customer_id,
    product_id: req.body.product_id,
    staff_id: req.body.staff_id,
    created_date: req.body.created_date,
    loan: req.body.loan,
    interest_rate: req.body.interest_rate,
    month: req.body.month,
    interest: req.body.interest, // Số tháng vay * 30 ngay * số tiền vay * lãi suất
    total_loan: req.body.total_loan, // lãi suất + số tiền vay
    status: 0
  });

  // Save Order in the database
  order
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the order."
      });
    });
};

// Retrieve all orders from the database.
exports.findAll = (req, res) => {
  Order.find()
    .then(orders => {
      res.send(orders);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving orders."
      });
    });
};

// Find a single order with a _id
exports.findOne = (req, res) => {
  Order.findOne({ _id: req.params._id })
    .then(order => {
      if (!order) {
        return res.status(404).send({
          message: "Order not found with _id " + req.params._id
        });
      }
      res.send(order);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Order not found with _id " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Something wrong retrieving order with _id " + req.params._id
      });
    });
};

// Update a order
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Order content can not be empty"
    });
  }

  // Find and update order with the request body
  Order.findOneAndUpdate(
    { _id: req.params._id },
    {
      customer_id: req.body.customer_id,
      product_id: req.body.product_id,
      staff_id: req.body.staff_id,
      created_date: req.body.created_date,
      loan: req.body.loan,
      interest_rate: req.body.interest_rate,
      month: req.body.month,
      interest: req.body.interest, // Số tháng vay * 30 ngay * số tiền vay * lãi suất
      total_loan: req.body.total_loan, // lãi suất + số tiền vay
      status: req.body.status
    },
    { new: true }
  )
    .then(order => {
      if (!order) {
        return res.status(404).send({
          message: "Order not found with _id " + req.params._id
        });
      }
      res.send(order);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Order not found with _id " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Something wrong updating note with _id " + req.params._id
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Order.findOneAndRemove({ _id: req.params._id })
    .then(order => {
      if (!order) {
        return res.status(404).send({
          message: "Order not found with _id " + req.params._id
        });
      }
      res.send({ message: "Order deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Order not found with _id " + req.params._id
        });
      }
      return res.status(500).send({
        message: "Could not delete order with _id " + req.params._id
      });
    });
};
