const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route   GET api/auth
// @desc    Test route
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
    let user = await User.findOne({email});
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

    // res.send("User registered successfully");
    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;