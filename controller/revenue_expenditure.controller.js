const Revenue_Expenditure = require("../model/revenue_expenditure.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "revenue_expenditure content can not be empty"
        });
    }

    const revenue_expenditure = new Revenue_Expenditure({
        date: req.body.date,
        staff_id: req.body.staff_id,
        customer_id: req.body.customer_id,
        revenue: req.body.revenue,
        expenditure: req.body.expenditure,
        total_money: req.body.total_money
    });
    // Save Staff in the database
    revenue_expenditure.save().then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the Revenue_Expenditure."
            });
        });
};
// Retrieve all staffs from the database.
exports.findAll = (req, res) => {
    Revenue_Expenditure.find().then(revenue_expenditure => {
        res.send(revenue_expenditure);
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving Revenue_expenditure. "
            });
        });
};
// Find a single staff with a id
exports.findOne = (req, res) => {
    Revenue_Expenditure.findOne({ _id: req.params.id })
        .then(revenue_expenditure => {
            if (!revenue_expenditure) {
                return.status(404).send({
                    message: " Revenue_Expenditure not found with id" + req.params.id
                });
            }
            return res.status(500).send({
                message: " Something wrong retrieving Revenue_Expenditure with id" + req.params.id
            });
        });
};

