const Staff = require("../model/staff.model.js");

//Create new Staff
exports.create = (req, res) => {
  // Request validation
  if (!req.body) {
    return res.status(400).send({
      message: "Staff content can not be empty"
    });
  }

  // Create a Staff
  const staff = new Staff({
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    birthday: req.body.birthday,
    phone: req.body.phone,
    identification: req.body.identification,
    address: req.body.address,
    permanent_address: req.body.permanent_address,
    created_date: req.body.created_date,
    created_address: req.body.created_address,
    avatar: req.body.avatar,
    gender: req.body.gender || true,
    role: req.body.role || true
  });

  // Save Staff in the database
  staff
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the staff."
      });
    });
};

// Retrieve all staffs from the database.
exports.findAll = (req, res) => {
  Staff.find()
    .then(staffs => {
      res.send(staffs);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving staffs."
      });
    });
};

// Find a single staff with a id
exports.findOne = (req, res) => {
  Staff.findOne({ _id: req.params.id })
    .then(staff => {
      if (!staff) {
        return res.status(404).send({
          message: "Staff not found with id " + req.params.id
        });
      }
      res.send(staff);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Staff not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Something wrong retrieving staff with id " + req.params.id
      });
    });
};

// Update a staff
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Staff content can not be empty"
    });
  }

  // Find and update staff with the request body
  Staff.findOneAndUpdate(
    { _id: req.params.id },
    {
      username: req.body.username,
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      birthday: req.body.birthday,
      phone: req.body.phone,
      identification: req.body.identification,
      address: req.body.address,
      permanent_address: req.body.permanent_address,
      created_date: req.body.created_date,
      created_address: req.body.created_address,
      avatar: req.body.avatar,
      gender: req.body.gender || true,
      role: req.body.role || true
    },
    { new: true }
  )
    .then(staff => {
      if (!staff) {
        return res.status(404).send({
          message: "Staff not found with id " + req.params.id
        });
      }
      res.send(staff);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Staff not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Something wrong updating note with id " + req.params.id
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Staff.findOneAndRemove({ _id: req.params.id })
    .then(staff => {
      if (!staff) {
        return res.status(404).send({
          message: "Staff not found with id " + req.params.id
        });
      }
      res.send({ message: "Staff deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Staff not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete staff with id " + req.params.id
      });
    });
};
