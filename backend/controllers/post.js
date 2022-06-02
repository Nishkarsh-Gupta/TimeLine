const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.getAllPosts = async(req, res, next) => {
    try {
        let posts;
        try {
            posts = await Post.find().populate("owner");
        }
        catch (error) {
            console.log(error);
        }
        if(!posts) {
            return res.status(404).json({
                success: false,
                message: "no posts found",
            });
        }
        res.status(201).json({
            success: true,
            posts,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.createPost = async(req, res, next) => {
    try {
        const { title, description, image, owner } = req.body;
        const user = await User.findById(owner);
        if(!user) {
            res.status(404).json({
                success: false,
                messae: "login first",
            });
        }
        let post = await Post.create({ title, description, image, owner });
        const session = await mongoose.startSession();
        session.startTransaction();
        await post.save({session});
        await user.posts.push(post);
        await user.save({session});
        session.commitTransaction();
        res.status(201).json({
            success: true,
            post,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updatePost = async(req, res, next) => {
    try {
        const { title, description } = req.body;
        const postId = req.params.id;
        const post = await Post.findByIdAndUpdate(postId, {
            title,
            description,
        });
        if(!post) {
            return re.status(400).json({
                success: false,
                message: "cannot update"
            });
        }
        res.status(201).json({
            success: true,
            post,
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.getPost = async(req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).json({
                success: false,
                message: "No post found"
            })
        }
        return res.status(201).json({
            success: true,
            post,
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deletePost = async(req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByIdAndRemove(postId);
        if(!post) {
            return res.status(404).json({
                success: false,
                message: "No post found"
            });
        }
        const owner = post.owner;
        const user = await User.findById(owner);
        const idx = user.posts.indexOf(req.params.id);
        user.posts.splice(idx, 1);
        await user.save();
        res.status(201).json({
            success: true,
            messae: "deleted"
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getPostofUser = async(req, res, next) => {
    try {
        const userId = req.params.id;
        // const user = await User.findById(userId);
        const posts = await User.findById(userId).populate("posts");
        if(!posts) {
            return res.status(404).json({
                success: false,
                messae: "no posts found",
            });
        }
        // const posts = user.posts;
        res.status(200).json({
            success: true,
            user: posts,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};