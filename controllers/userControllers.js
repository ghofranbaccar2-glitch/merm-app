const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if user already exists (by username and email)

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        //create new user
        const newUser = new User({ username, email, password: hashedPassword });
        //Respond with success message
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
        console.log("Server Error:", error)
    }
}

//login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        //compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        //generate JWT token
        const token = jwt.sign(
            { userId: user._id } ,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        //Respond with token and user info without password
        res.status(200).json({ message: 'logged successfully', token,
             user:{ id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
        console.log("Server Error:", error)
    }
}