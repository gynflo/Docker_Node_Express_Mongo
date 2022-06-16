const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Post must have title"]
    },
    body: {
        type: String,
        required: [true, "Body must have body"]
    }
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;