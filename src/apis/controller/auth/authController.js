const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
require("dotenv").config();
const secretKey = process.env.KEY || 'default-secret';
const authController = {
    register: async (req, res) => {
        try {
            const user = new User(req.body);

            const emailValidation = await User.findOne({ email: user.email });
            if (emailValidation) {
                return res.status(409).json({ message: 'User email already exists' });
            }
            const phoneValidation = await User.findOne({ phone: user.phone });
            if (phoneValidation) {
                return res.status(409).json({ message: 'Phone number already exists' });
            }

            const token = await user.generateToken({ expiresIn: "24h" });
            console.log("Generated token: " + token);

            res.cookie("jwt", token);

            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            // Handle error
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
            const { tokens,password,orders,reviews, ...userData } = req.user.toObject();
            res.status(200).json(userData);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = authController