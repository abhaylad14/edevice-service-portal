const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

// @route   POST api/users
// @desc    Registration route
// @access  Public
router.post("/", [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({min:8}),
    check("mobile", "Mobile number must contains 10 digits").isLength({min:10, max:10}),
    check("pincode", "Pincode must contains 6 digits").isLength({min:6, max:6}),
    check("address", "Address is required").not().isEmpty()
],async (req,res) => {
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    const {name, email, password, mobile, pincode, address} = req.body;
    try{
    // See if user exists
    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({ errors: [{ msg: "User already exists"}]});
    }

    // Gets user's gravatar
    const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
    });

    user = new User({
        name, email, avatar, password, mobile, pincode, address, status: 2
    });

    // Encrypt Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

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
        res.json({status, token});
    })

    // res.send("User registered successfully");
    }catch(err){
        console.error(err);
        return res.status(500).json({ errors: [{ msg: "Internal Server Error"}]});
    }
});

// @route   POST api/users/employee
// @desc    Employee Registration route
// @access  Private
router.post("/employee", auth, [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({min:8}),
    check("mobile", "Mobile number must contains 10 digits").isLength({min:10, max:10}),
    check("pincode", "Pincode must contains 6 digits").isLength({min:6, max:6}),
    check("address", "Address is required").not().isEmpty(),
    check("type", "Employee type is required").not().isEmpty(),
],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    const {name, email, password, mobile, pincode, address,type} = req.body;
    try{
    // See if user exists
    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({ errors: [{ msg: "Employee already exists"}]});
    }

    // Gets user's gravatar
    const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
    });

    user = new User({
        name, email, avatar, password, mobile, pincode, address, type
    });

    // Encrypt Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Return jsonwebtoken
    const payload = {
        user:{
            id: user.id
        }
    }
    jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000},
    (err) => {
        if(err) throw err;
        res.json({msg: "Employee registered successfully!"});
    })
    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
});

// @route   GET api/users/getcustomers
// @desc    Get the list of customers
// @access  Public
router.get("/getcustomers", auth, async (req,res) => {
    let status = false;
    try {
        const data = await User.find({userType:1}).select("-password");
        status = true;
        res.status(200).json({status,data});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;