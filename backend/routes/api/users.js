const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const adminauth = require("../../middleware/adminauth");

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
        name, email, avatar, password, mobile, pincode, address, status: 2, usertype: 1
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
router.post("/employee", adminauth, [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({min:8}),
    check("mobile", "Mobile number must contains 10 digits").isLength({min:10, max:10}),
    check("pincode", "Pincode must contains 6 digits").isLength({min:6, max:6}),
    check("address", "Address is required").not().isEmpty(),
    check("type", "Employee type is required").not().isEmpty(),
],async (req,res) => {
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    const {name, email, password, mobile, pincode, address, type} = req.body;
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
        name, email, avatar, password, mobile, pincode, address, usertype: type, status: 1
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
        status = true;
        res.status(200).json({status, msg: "Employee registered successfully!"});
    })
    }catch(err){
        console.error(err);
        res.status(500).json({msg: "Server error"});
    }
});

// @route   GET api/users/getcustomers
// @desc    Get the list of customers
// @access  Private
router.get("/getcustomers", adminauth, async (req,res) => {
    let status = false;
    try {
        const data = await User.find({usertype:1}).select("-password");
        status = true;
        res.status(200).json({status,data});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "Server Error!"});
    }
});

// @route   GET api/users/getdeliveryboys
// @desc    Get the list of deliveryboys
// @access  Private
router.get("/getdeliveryboys", adminauth, async (req,res) => {
    let status = false;
    try {
        const data = await User.find({usertype:2}).select("-password");
        status = true;
        res.status(200).json({status,data});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "Server Error!"});
    }
});

// @route   GET api/users/getserviceman
// @desc    Get the list of serviceman
// @access  Private
router.get("/getserviceman", adminauth, async (req,res) => {
    let status = false;
    try {
        const data = await User.find({usertype:3}).select("-password");
        status = true;
        res.status(200).json({status,data});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "Server Error!"});
    }
});

// @route   GET api/users/serviceman
// @desc    Get the list of active serviceman
// @access  Private
router.get("/serviceman", adminauth, async (req,res) => {
    let status = false;
    try {
        const data = await User.find({usertype:3}).select("-password");
        status = true;
        res.status(200).json({status,data});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "Server Error!"});
    }
});

// @route   GET api/users/deliveryboys
// @desc    Get the list of active deliveryboys
// @access  Private
router.get("/deliveryboys", adminauth, async (req,res) => {
    let status = false;
    try {
        const data = await User.find({usertype:2}).select("-password");
        status = true;
        res.status(200).json({status,data});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "Server Error!"});
    }
});

// @route   POST api/users/deleteuser
// @desc    Deletes the user
// @access  Private
router.post("/deleteuser", adminauth, [
    check("id", "User ID is required").not().isEmpty()
], async (req,res) => {
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const user = await User.findByIdAndDelete({_id: req.body.id})
        status = true;
        res.status(200).json({status, msg: "User has been deleted successfully!"});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "Server Error!"});
    }
});

// @route   POST api/users/deactivate
// @desc    Soft Delete profile (Deactivate user)
// @access  Private
router.post("/deactivate", adminauth, [
    check("id", "User ID is required").not().isEmpty()
],async (req, res)=>{
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        await User.findByIdAndUpdate({_id: req.body.id}, {status: 0});
        status = true;
        return res.json({status, msg: "User Deactivated successfully"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "User not found"}); 
        }
        res.status(500).json({msg: "Server Error"});
    }
});

// @route   POST api/users/activate
// @desc    Restore Deleted profile (Reactive user)
// @access  Private
router.post("/activate", adminauth, [
    check("id", "User ID is required").not().isEmpty()
],async (req, res)=>{
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        await User.findByIdAndUpdate({_id: req.body.id}, {status: 1});
        status = true;
        res.json({status, msg: "User activated successfully"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            res.status(400).json({ msg: "User not found"}); 
        }
        res.status(500).json({msg: "Server Error"});
    }
});

module.exports = router;