const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

//for getting all the users
exports.getAllUsers = async(req, res, next) => {
    try {
        let users = await User.find();
        if(!users) {
            res.status(404).json({
                success: false,
                message: "no users found",
            })
        }
        res.status(200).json({
            success: true,
            users,
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

//for signup/registering to the app
exports.signup = async(req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        user = await User.create({ name, email, password, posts: [] });

        // creating a cookie for the user when logged in + once registered login as well
        // const token = await user.generateToken();
        // const options = {expires: new Date(Date.now() + 90*24*60*60*1000), httpOnly: true};
        await user.save();
        res.status(201).json({
            success: true,
            message: "signup successful",
            user,
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    } 
};

//for login
exports.login = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");;
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "user doesn't exits",
            });
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            });
        }
        res.status(201).json({
            success: true,
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};