module.exports = app =>{
    const users = require("../controller/login.controller.js");

    app.post("/login", users.loginUser)
}