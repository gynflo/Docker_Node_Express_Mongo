const Post = require('../models/postModel');

/* CRUD */

exports.createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json({
            status: "Success",
            data: {
                post
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "Fail",
        })
    }
};

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();

        res.status(200).json({
            status: "Success",
            result: posts.length,
            data: {
                posts
            }
        })
    } catch (e) {
        console.log("🚀 ~ file: postController.js ~ line 35 ~ exports.getAllPosts= ~ e", e)

        res.status(400).json({
            status: "Fail",
        })
    }
};

exports.getOnePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            status: "Success",
            data: {
                post
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "Fail",
        })
    }
};

exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(203).json({
            status: "Success",
            data: {
                post
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "Fail",
        })
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "Success",
        })
    } catch (e) {
        res.status(400).json({
            status: "Fail",
        })
    }
};