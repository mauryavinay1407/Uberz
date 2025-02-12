const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const { registerUser, loginUser, getUserProfile, logoutUser } = require('../controllers/user.controller');
const { authUser } = require('../middlewares/auth.middleware');

router.post('/register',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters'),
        body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters'),

    ]
, registerUser)

router.post('/login',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters')
    ]
, loginUser)

router.get('/profile',authUser,getUserProfile);

router.get('/logout',authUser,logoutUser);

module.exports = router;