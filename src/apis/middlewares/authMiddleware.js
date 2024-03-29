const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const authMiddleware = {
  authenticate: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ message: "Authentication failed: No token provided." });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Authentication failed: No token provided." });
      }

      const decodedToken = jwt.verify(token, process.env.KEY);

      const user = await User.findById(decodedToken._id);

      if (!user) {
        return res
          .status(401)
          .json({ message: "Authentication failed: User not found." });
      }

      req.token = token;
      req.user = user;

      next();
    } catch (error) {
      res
        .status(401)
        .json({ message: "Authentication failed: Invalid token." });
    }
  },
  authenticateadmin: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authentication failed: No token provided." });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Authentication failed: No token provided." });
      }

      const decodedToken = jwt.verify(token, process.env.KEY);

      const user = await User.findById(decodedToken._id);

      if (!user) {
        return res.status(401).json({ message: "Authentication failed: User not found." });
      }

      // Check if the user has admin access
      if (user.role !== 'Admin') {
        return res.status(403).json({ message: "Forbidden: User does not have admin access." });
      }

      req.token = token;
      req.user = user;

      next();
    } catch (error) {
      res.status(401).json({ message: "Authentication failed: Invalid token." });
    }
  }
};

module.exports = authMiddleware;
