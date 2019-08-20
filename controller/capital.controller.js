const Capital = require("../model/capital.model.js");

exports.create = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Capital content can not be empty"
        });
    }

    const capital = new Capital({
        staff_id: req.body.staff_id,
        money: req.body.money
    });

    capital.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the capital."
        });
    });
};
exports.findAll = (req, res) => {
    Capital.find().then(capital => {
        res.send(capital);
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving capital."

            });
        });
};

exports.findOne = (req, res) => {
    Capital.findOne({ _id: req.params.id })
        .then(capital => {
            if (!capital) {
                return res.status(404).send({
                    message: "Capital not found with id " + req.params.id
                });
            }
            res.send(capital);
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Capital not found with id" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving capital with id" + req.params.id
            });
        });
};


exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Capital content can not be empty"
        });
    }


    Capital.findOneAndUpdate(
        { _id: req.params.id },
        {

            staff_id: req.body.staff_id,
            money: req.body.money
        },
        { new: true }
    )
        .then(capital => {
            if (!capital) {
                return res.status(404).send({
                    message: "Capital not found with id" + req.params.id
                });
            }
            res.send(capital);

        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "capital not found with id" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.id
            });
        });
};

exports.delete = (req, res) => {
    Capital.findOneAndRemove({ _id: req.params.id })
        .then(capital => {
            if (!capital) {
                return res.status(404).send({
                    message: "capital not found with id " + req.params.id
                });
            }
            res.send({ message: "capital deleted successfully!" });
        })
        .catch(err => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "Capital not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete capital with id " + req.params.id
            })
        });
};