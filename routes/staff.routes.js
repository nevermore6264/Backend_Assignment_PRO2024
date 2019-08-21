module.exports = app => {
  const staffs = require("../controller/staff.controller.js");

  // Create a new Staff
  app.post("/staffs", staffs.create);

  // Retrieve all Staffs
  app.get("/staffs", staffs.findAll);

  // Retrieve a single User with Staff ID
  app.get("/staffs/:id", staffs.findOne);

  // Update a Note with Staff ID
  app.put("/staffs/:id", staffs.update);

  // Delete a Note with Staff ID
  app.delete("/staffs/:id", staffs.delete);

  // // login
  // app.post("/login/", staffs.login);
};
