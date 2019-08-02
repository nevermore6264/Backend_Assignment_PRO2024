module.exports = (app) => {
    const products = require('../controller/product.controller.js');

    // Create a new product
    app.product('/products', products.create);

    // Retrieve all products
    app.get('/products', products.findAll);

    // Retrieve a single product with productId
    app.get('/products/:_id', products.findOne);

    // Update a Note with productId
    app.put('/products/:_id', products.update);

    // Delete a Note with productId
    app.delete('/products/:_id', products.delete);
}