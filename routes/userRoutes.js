const router= require('express').Router();
const userControllers= require('../controllers/userControllers');
const isAuth = require('../middlewares/isAuth');
const { validateRegister, checkValidation, validateLogin } = require('../middlewares/validator');
//test route
router.get('/test', isAuth, (req, res)=>{
     res.send('user route is working !')
});
//Register route   
router.post('/register', validateRegister, checkValidation, userControllers.registerUser);
//login route
router.post('/login', validateLogin, checkValidation, userControllers.loginUser);
//Protected route(me)
router.get('/me', isAuth, (req, res)=>{
    res.status(200).json({ user: req.user });
});

module.exports = router;