const Customer = require("../model/customer.model.js");

//Create new Customer
exports.create = (req, res) => {
  // Request validation
  if (!req.body) {
    return res.status(400).send({
      message: "Customer content can not be empty"
    });
  }

  // Create a Customer
  const customer = new Customer({
    fullname: req.body.fullname,
    email: req.body.email,
    birthday: req.body.birthday,
    phone: req.body.phone,
    identification: req.body.identification,
    address: req.body.address,
    permanent_address: req.body.permanent_address,
    created_date: req.body.created_date,
    created_address: req.body.created_address,
    avatar: req.body.avatar,
    gender: req.body.gender || true,
    description: {
      job: req.body.description.job,
      salary: req.body.description.salary,
      company: req.body.description.company,
      contact_people: req.body.description.contact_people,
      contact_phone: req.body.description.contact_phone,
      father_name: req.body.description.father_name,
      father_phone: req.body.description.father_phone,
      mother_name: req.body.description.mother_name,
      mother_phone: req.body.description.mother_phone
    }
  });

  // Save Customer in the database
  customer
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the customer."
      });
    });
};

// Retrieve all customers from the database.
exports.findAll = (req, res) => {
  Customer.find()
    .then(customers => {
      res.send(customers);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving customers."
      });
    });
};

// Find a single customer with a id
exports.findOne = (req, res) => {
  Customer.findOne({ _id: req.params.id })
    .then(customer => {
      if (!customer) {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.id
        });
      }
      res.send(customer);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Something wrong retrieving customer with id " + req.params.id
      });
    });
};

// Update a customer
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Customer content can not be empty"
    });
  }

  // Find and update customer with the request body
  Customer.findOneAndUpdate(
    { _id: req.params.id },
    {
      fullname: req.body.fullname,
      email: req.body.email,
      birthday: req.body.birthday,
      phone: req.body.phone,
      identification: req.body.identification,
      address: req.body.address,
      permanent_address: req.body.permanent_address,
      created_date: req.body.created_date,
      created_address: req.body.created_address,
      avatar: req.body.avatar,
      gender: req.body.gender || true,
      description: {
        job: req.body.description.job,
        salary: req.body.description.salary,
        company: req.body.description.company,
        contact_people: req.body.description.contact_people,
        contact_phone: req.body.description.contact_phone,
        father_name: req.body.description.father_name,
        father_phone: req.body.description.father_phone,
        mother_name: req.body.description.mother_name,
        mother_phone: req.body.description.mother_phone
      }
    },
    { new: true }
  )
    .then(customer => {
      if (!customer) {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.id
        });
      }
      res.send(customer);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Something wrong updating note with id " + req.params.id
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Customer.findOneAndRemove({ _id: req.params.id })
    .then(customer => {
      if (!customer) {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.id
        });
      }
      res.send({ message: "Customer deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Customer not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete customer with id " + req.params.id
      });
    });
};
