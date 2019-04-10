module.exports = (app) => {
    const users = require('../controller/user.controller.js');

    // Create a new User
    app.post('/users', users.create);

    // Retrieve all Users
    app.get('/users', users.findAll);

    // Retrieve a single User with userId
    app.get('/users/:email', users.findOne);

    // Update a Note with userId
    app.put('/users/:email', users.update);

    // Delete a Note with userId
    app.delete('/users/:email', users.delete);
}