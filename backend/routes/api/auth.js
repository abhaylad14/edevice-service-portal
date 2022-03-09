const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");


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
// @desc    Authenticate user and get token
// @access  Public
router.post("/", [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").exists()
],async (req,res) => {
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
        res.json({token});
    })

    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
});

// @route   POST api/auth/forgotpassword
// @desc    Forgot password route
// @access  Public
router.get("/forgotpassword",[
        check("email", "Please enter a valid email").isEmail()
], async (req,res) => {
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
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;