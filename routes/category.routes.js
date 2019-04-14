module.exports = (app) => {
    const categorys = require('../controller/category.controller.js');

    // Create a new Category
    app.post('/categories', categorys.create);

    // Retrieve all Categorys
    app.get('/categories', categorys.findAll);

    // Retrieve a single Category with categoryId
    app.get('/categories/:key', categorys.findOne);

    // Update a Note with categoryId
    app.put('/categories/:key', categorys.update);

    // Delete a Note with categoryId
    app.delete('/categories/:key', categorys.delete);
}