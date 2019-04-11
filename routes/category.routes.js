module.exports = (app) => {
    const categorys = require('../controller/category.controller.js');

    // Create a new Category
    app.post('/categorys', categorys.create);

    // Retrieve all Categorys
    app.get('/categorys', categorys.findAll);

    // Retrieve a single Category with categoryId
    app.get('/categorys/:key', categorys.findOne);

    // Update a Note with categoryId
    app.put('/categorys/:key', categorys.update);

    // Delete a Note with categoryId
    app.delete('/categorys/:key', categorys.delete);
}