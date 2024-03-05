const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const uploadoncloudinary=require("../../../common/utils/cloudinary");
require("dotenv").config();
const { validationResult } = require('express-validator');
const secretKey = process.env.KEY || 'default-secret';
const authController = {
    register: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const emailValidation = await User.findOne({ email: req.body.email });
            if (emailValidation) {
                return res.status(409).json({ message: 'User email already exists' });
            }
            const phoneValidation = await User.findOne({ phone: req.body.phone });
            if (phoneValidation) {
                return res.status(409).json({ message: 'Phone number already exists' });
            }
            console.log(req.file)
            if (!req.file) {
                return res.status(400).json({ message: 'Profile picture required' });
            }
            const profilePicturepath = req.file.path;
            if (!profilePicturepath) {
                return res.status(400).json({ message: 'Profile Picture Required' });
            }
    
            // Upload profile picture to Cloudinary
            const result = await uploadoncloudinary(profilePicturepath);
            console.log(result)
            if (!result || !result.secure_url) {
                return res.status(400).json({ message: 'Error uploading Profile Picture' });
            }
    
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                profilePicture: result.secure_url // Assign Cloudinary URL here
            });
            const token = await user.generateToken({ expiresIn: "24h" });
            console.log("Generated token: " + token);
    
            res.cookie("jwt", token);
    
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            // Handle error
            console.error(error);
            res.status(400).send(error);
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: "User not found." });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log("login page" + isPasswordValid);

            if (isPasswordValid) {
                const token = await user.generateToken({ expiresIn: "24h" });
                return res.status(200).json({ message: 'Login successful!', token, user: email });
            } else {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    },
    getuserProfile: (req, res, next) => {
        try {
            const { tokens, password, orders, reviews, ...userData } = req.user.toObject();
            res.status(200).json(userData);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = authController