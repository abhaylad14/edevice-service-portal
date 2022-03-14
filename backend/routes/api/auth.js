const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const auth = require("../../middleware/auth");
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

// @route   GET api/auth
// @desc    Get Logged in User details 
// @access  Public
router.get("/", auth, async (req,res) => {
    // res.send("Auth route")
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST api/auth
// @desc    Authenticate user and get token (Login)
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
    let user = await User.findOne({email: email, status: 1});
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
    jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000},
    (err,token) => {
        if(err) throw err;
        status = true;
        res.json({status,token});
    })

    }catch(err){
        console.error(err);
        res.status(500).json({errors: [{ msg: "Internal Server Error"}]});
    }
});

// @route   POST api/auth/forgotpassword
// @desc    Forgot password route
// @access  Public
router.get("/forgotpassword",[
        check("email", "Please enter a valid email").isEmail()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    // res.send("Auth route")
    try {
        const user = await User.findOne({email: req.body.email, status: 1});
        // res.json(user);
        if(!user){
            return res.status(404).json({ errors: [{ msg: "There is no user with this email"}]});
        }
        // Get reset token
        const resetToken = user.getResetPasswordToken();
        console.log(resetToken);

        await user.save({ valodateBeforeSave: false })

        // Create reset url
        const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;
        const message = `You are receiving this email because you ( or someone else ) has requested of a reset password. Please make a put request to: \n\n ${resetUrl}`;
        try {
             await sendEmail({
                 email: user.email,
                 subject: "Password Reset Token",
                 message 
             });
             res.status(200).json({msg: "Email sent successfully!"})
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

// @route   PUT api/auth/resetpassword/:resetToken
// @desc    Reset Password
// @access  Public
router.put("/resetpassword/:resetToken", async (req,res) => {
    // Get hashed token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
    
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    });
    if(!user){
        return res.status(400).send("Invalid Token");
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
        res.json({token});
    })
});

module.exports = router;