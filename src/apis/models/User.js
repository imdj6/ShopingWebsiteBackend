const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' },
    profilePicture: { type: String },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    createdAt: { type: Date, default: Date.now },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]


});

userSchema.methods.generateToken = async function (options) {
    try {
        const token = jwt.sign({ _id: this._id.toString(), role: this.role.toString() }, process.env.KEY, options);

        // Remove expired tokens
        this.tokens = this.tokens.filter(tokenObj => {
            try {
                jwt.verify(tokenObj.token, process.env.KEY);
                return true; // Token is valid, keep it
            } catch (error) {
                return false; // Token is expired, remove it
            }
        });

        // Limit maximum tokens to 2
        if (this.tokens.length >= 2) {
            this.tokens.shift(); // Remove the oldest token
        }

        this.tokens.push({ token });

        await this.save();
        return token;
    } catch (error) {
        console.log(error);
        throw new Error("Token generation failed");
    }
};

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})


const User = mongoose.model('User', userSchema);

module.exports = User;
