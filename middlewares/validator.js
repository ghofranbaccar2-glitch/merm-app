const {
    body, validationResult
} = require('express-validator');
// Validation rules for user registration  
exports.validateRegister = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
   .isLength({min:6})
   .withMessage('Password must be at least 6 characters long'),
];
// Validation rules for user login
exports.validateLogin = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
];
// Middleware to check validation results
exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};