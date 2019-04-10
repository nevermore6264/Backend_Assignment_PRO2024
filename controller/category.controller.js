const Category = require('../model/category.model.js');

//Create new Category
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Category content can not be empty"
        });
    }

    // Create a Category
    const category = new Category({
        key: req.body.key,
        name: req.body.name,
    });

    // Save Category in the database
    category.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the category."
            });
        });
};

// Retrieve all categorys from the database.
exports.findAll = (req, res) => {
    Category.find()
        .then(categorys => {
            res.send(categorys);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving categorys."
            });
        });
};

// Find a single category with a key
exports.findOne = (req, res) => {
    Category.findOne({ key: req.params.key })
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with key " + req.params.key
                });
            }
            res.send(category);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with key " + req.params.key
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving category with key " + req.params.key
            });
        });
};

// Update a category
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Category content can not be empty"
        });
    }

    // Find and update category with the request body
    Category.findOneAndUpdate({ key: req.params.key }, {
        key: req.body.key,
        name: req.body.name,
    }, { new: true })
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with key " + req.params.key
                });
            }
            res.send(category);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with key " + req.params.key
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with key " + req.params.key
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Category.findOneAndRemove({ key: req.params.key })
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with key " + req.params.key
                });
            }
            res.send({ message: "Category deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Category not found with key " + req.params.key
                });
            }
            return res.status(500).send({
                message: "Could not delete category with key " + req.params.key
            });
        });
};