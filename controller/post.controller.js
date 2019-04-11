const Post = require('../model/post.model.js');

//Create new Post
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Post content can not be empty"
        });
    }

    // Create a Post
    const post = new Post({
        
        
    });

    // Save Post in the database
    post.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the post."
            });
        });
};

// Retrieve all posts from the database.
exports.findAll = (req, res) => {
    Post.find()
        .then(posts => {
            res.send(posts);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving posts."
            });
        });
};

// Find a single post with a key
exports.findOne = (req, res) => {
    Post.findOne({ key: req.params.key })
        .then(post => {
            if (!post) {
                return res.status(404).send({
                    message: "Post not found with key " + req.params.key
                });
            }
            res.send(post);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Post not found with key " + req.params.key
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving post with key " + req.params.key
            });
        });
};

// Update a post
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Post content can not be empty"
        });
    }

    // Find and update post with the request body
    Post.findOneAndUpdate({ key: req.params.key }, {
        key: req.body.key,
        name: req.body.name,
    }, { new: true })
        .then(post => {
            if (!post) {
                return res.status(404).send({
                    message: "Post not found with key " + req.params.key
                });
            }
            res.send(post);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Post not found with key " + req.params.key
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with key " + req.params.key
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Post.findOneAndRemove({ key: req.params.key })
        .then(post => {
            if (!post) {
                return res.status(404).send({
                    message: "Post not found with key " + req.params.key
                });
            }
            res.send({ message: "Post deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Post not found with key " + req.params.key
                });
            }
            return res.status(500).send({
                message: "Could not delete post with key " + req.params.key
            });
        });
};