const User = require('../model/user.model.js');

//Create new User
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Create a User
    const user = new User({
        fullname: req.body.fullname || "No name",
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        avatar: req.body.avatar,
        gender: req.body.gender,
    });

    // Save User in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the user."
            });
        });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving users."
            });
        });
};

// Find a single user with a email
exports.findOne = (req, res) => {
    User.findOne({ email: req.params.email })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with email " + req.params.email
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with email " + req.params.email
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving user with email " + req.params.email
            });
        });
};

// Update a user
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find and update user with the request body
    User.findOneAndUpdate({ email: req.params.email }, {
        fullname: req.body.fullname || "No name",
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        avatar: req.body.avatar,
        gender: req.body.gender,
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with email " + req.params.email
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with email " + req.params.email
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with email " + req.params.email
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    User.findOneAndRemove({ email: req.params.email })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with email " + req.params.email
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with email " + req.params.email
                });
            }
            return res.status(500).send({
                message: "Could not delete user with email " + req.params.email
            });
        });
};