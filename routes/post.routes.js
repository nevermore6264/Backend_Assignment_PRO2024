module.exports = (app) => {
    const posts = require('../controller/post.controller.js');

    // Create a new post
    app.post('/posts', posts.create);

    // Retrieve all posts
    app.get('/posts', posts.findAll);

    // Retrieve a single post with postId
    app.get('/posts/:_id', posts.findOne);

    // Update a Note with postId
    app.put('/posts/:_id', posts.update);

    // Delete a Note with postId
    app.delete('/posts/:_id', posts.delete);
}