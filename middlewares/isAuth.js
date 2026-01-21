const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
// Middleware to check if user is authenticated
const isAuth = async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        // Check if token is present
        if (!token) {
            return res.status(401).json({ message: 'Authentication failed: No token provided' });
        }
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //find user by id in token
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed: User not found' });
        }
        // Attach user to request object
        req.user = user;
        next()
    } catch (error) {
        res.status(500).json({ message: 'Auth Error' });
        console.log("Auth Error", error);
    };
};

module.exports = isAuth;