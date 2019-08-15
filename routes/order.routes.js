module.exports = app => {
  const orders = require("../controller/order.controller.js");

  // Create a new order
  app.post("/orders", orders.create);

  // Retrieve all orders
  app.get("/orders", orders.findAll);

  // Retrieve a single order with orderId
  app.get("/orders/:_id", orders.findOne);

  // Update a Note with orderId
  app.put("/orders/:_id", orders.update);

  // Delete a Note with orderId
  app.delete("/orders/:_id", orders.delete);
};
