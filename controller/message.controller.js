const Message = require("../model/message.model.js");
const Nexmo = require("nexmo");
const utf8 = require("utf8");

const nexmo = new Nexmo({
  apiKey: "e577005e",
  apiSecret: "hIMuSip74IAUVJTk"
});

//Create new Message
exports.create = (req, res) => {
  // Request validation
  if (!req.body) {
    return res.status(400).send({
      message: "Message can not be empty"
    });
  }

  // Create a Message
  const message = new Message({
    customer_id: req.body.customer_id,
    staff_id: req.body.staff_id,
    customer_phone: req.body.customer_phone,
    staff_phone: req.body.staff_phone,
    created_date: req.body.created_date,
    context: req.body.context
  });
  //send message
  const from = message.staff_phone;
  const to = message.customer_phone;
  const text = req.body.context;

  nexmo.message.sendSms(from, to, text);

  // Save Message in the database
  message
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the message."
      });
    });
};

// Retrieve all messages from the database.
exports.findAll = (req, res) => {
  Message.find()
    .then(messages => {
      res.send(messages);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving messages."
      });
    });
};
