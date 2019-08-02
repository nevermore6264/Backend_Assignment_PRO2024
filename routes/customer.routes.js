module.exports = app => {
    const customers = require("../controller/customer.controller.js");
  
    // Create a new customer
    app.post("/customers", customers.create);
  
    // Retrieve all customers
    app.get("/customers", customers.findAll);
  
    // Retrieve a single User with customer ID
    app.get("/customers/:id", customers.findOne);
  
    // Update a Note with customer ID
    app.put("/customers/:id", customers.update);
  
    // Delete a Note with customer ID
    app.delete("/customers/:id", customers.delete);
  };
  