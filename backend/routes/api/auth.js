const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const adminauth = require("../../middleware/adminauth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const sendEmail = require("../../sendEmail");
const crypto = require("crypto");

/*
    Types of users: 
    Admin       :  0
    Customer    :  1
    Deliveryboy :  2
    Serviceman  :  3
*/ 

// @route   GET api/adminauth
// @desc    Get Logged in User details 
// @access  Public
router.get("/", adminauth, async (req,res) => {
    // res.send("adminauth route")
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST api/adminauth
// @desc    authenticate user and get token (Login)
// @access  Public
router.post("/", [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty()
],async (req,res) => {
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    const {email, password} = req.body;
    try{
    // See if user exists
    let user = await User.findOne({email: email, $or:[{status: 1}, {status: 2}]});
    if(!user){
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials!"}]});
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials!"}]});
    }

    // Return jsonwebtoken
    const payload = {
        user:{
            id: user.id
        }
    }
    if(user.status == 1){
        status = true;
        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000},
        (err,token) => {
        if(err) throw err;
        status = true;
        let userType = user.usertype;
        res.json({status,token,userType});
    })
    }
    else if(user.status == 2){
        const otp = Math.floor(100000 + Math.random() * 900000);
        const message = `Your OTP for verification is: ${otp}.`;
        try {
             await sendEmail({
                 email: user.email,
                 subject: "Verify account",
                 message 
             });
             user.resetPasswordToken = otp;
             user.createdAt = Date.now();
             user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
             await user.save({validateBeforeSave: false});
             res.status(200).json({status, msg: "Please verify your account"});
        } catch (err) {
            console.log(err);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({validateBeforeSave: false});
            res.status(500).json({msg: "Email could not be sent! Something went wrong!"});
        }

    }
    }catch(err){
        console.error(err);
        res.status(500).json({errors: [{ msg: "Internal Server Error"}]});
    }
});

// @route   POST api/adminauth/forgotpassword
// @desc    Forgot password route
// @access  Public
router.post("/forgotpassword",[
        check("email", "Please enter a valid email").isEmail()
], async (req,res) => {
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    // res.send("adminauth route")
    try {
        const user = await User.findOne({email: req.body.email, status: 1});
        // res.json(user);
        if(!user){
            return res.status(404).json({ errors: [{ msg: "There is no user with this email"}]});
        }
        // Get reset token
        const resetToken = user.getResetPasswordToken();
        console.log(resetToken);

        await user.save({ validateBeforeSave: false })

        // Create reset url
        // const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;
        const resetUrl = `http://localhost:3000/resetpassword?q=${resetToken}`;
        const message = `You are receiving this email because you ( or someone else ) has requested of a reset password. Please make a put request to: \n\n ${resetUrl}`;
        try {
             await sendEmail({
                 email: user.email,
                 subject: "Password Reset Token",
                 message 
             });
             status = true;
             res.status(200).json({status, msg: "Email sent successfully!"});
        } catch (err) {
            console.log(err);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({validateBeforeSave: false});
            res.status(500).send("Email could not be sent! Something went wrong!");
        }
        // return res.status(200).json({email: user.email,createdAt :user.createdAt, token: user.resetPasswordToken, expire: user.resetPasswordExpire})
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST api/adminauth/resetpassword/
// @desc    Reset Password
// @access  Public
router.post("/resetpassword",[
    check("password", "Password is required").not().isEmpty(),
    check("resetToken", "ResetToken is required").not().isEmpty()
], async (req,res) => {
    let status = false;
    // Get hashed token
    const resetPasswordToken = crypto.createHash('sha256').update(req.body.resetToken).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    });
    if(!user){
        return res.status(400).json({status, msg: "Invalid Token"});
    }
    // Set new Password
    // Encrypt Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;  
    await user.save();
    // Return jsonwebtoken
    const payload = {
        user:{
            id: user.id
        }
    }
    jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 3600},
    (err,token) => {
        if(err) throw err;
        status = true;
        res.status(200).json({status,token});
    })
});

// @route   POST api/adminauth/verifyotp
// @desc    Verifies the otp for an account
// @access  Public
router.post("/verifyotp",[
    check("email", "Invalid Email").isEmail(),
    check("otp", "OTP is required").not().isEmpty(),
    check("otp", "OTP is invalid").isNumeric()
], async (req,res) => {
    console.log(req.body);
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const user = await User.findOne({email: req.body.email, resetPasswordToken: req.body.otp, resetPasswordExpire: {$gt: Date.now()}});
        if(!user){
            return res.status(400).json({ errors: [{ msg: "OTP has been expired!"}]});
        }

        // Return jsonwebtoken
    const payload = {
        user:{
            id: user.id
        }
    }
        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 36000},
    async (err,token) => {
        if(err) throw err;
        status = true;
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        user.status = 1;
        let userType = user.usertype;
        await user.save({validateBeforeSave: false});
        return res.status(200).json({status, token, userType});
    })
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({errors: [{ msg: "Internal Server Error"}]});
    }
});
module.exports = router;