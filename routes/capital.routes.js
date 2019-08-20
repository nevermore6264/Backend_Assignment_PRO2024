module.exports = app =>{
    const capital = require("../controller/capital.controller.js");

    app.post("/capitals", capital.create);

    app.get("/capitals", capital.findAll);

    app.get("/capitals/:id", capital.findOne);

    app.put("/capitals/:id", capital.update);

    app.delete("/capitals/:id", capital.delete);
};