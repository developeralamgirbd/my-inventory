const express = require('express');
const router = express.Router();

const {register, login, passwordUpdate, verifyOTP, sendOTP, resetPassword, getUserProfile,
    patchUser
} = require('../controllers/user/userController');
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");


router.post('/register', register);

router.post('/login', login);
router.get('/users/:email/:otp', verifyOTP);
router.patch('/users/:email/:otp', resetPassword);
router.get('/users/:email', sendOTP);

router.patch('/users/password', AuthVerifyMiddleware, passwordUpdate);
router.patch('/users', AuthVerifyMiddleware, patchUser);
router.get('/users', AuthVerifyMiddleware, getUserProfile);

// Auth check route
router.get('/auth-check', AuthVerifyMiddleware, (req, res)=>{
    res.status(200).json({ok: true});
});


module.exports = router;