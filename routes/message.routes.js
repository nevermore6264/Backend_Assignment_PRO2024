module.exports = app => {
  const messages = require("../controller/message.controller.js");

  // Create a new message
  app.post("/messages", messages.create);

  // Retrieve all messages
  app.get("/messages", messages.findAll);
};
