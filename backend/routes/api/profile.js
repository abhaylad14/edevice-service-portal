const express = require("express");
const router = express.Router();
const adminauth = require("../../middleware/adminauth");
const User = require("../../models/User");
const { check, validationResult} = require("express-validator");

// @route   GET api/profile/me
// @desc    Get current user's profile (logged in user)
// @access  Private
router.get("/me", adminauth, async(req,res) => {
    try {
        const profile = await User.findOne({user: req.user.id }).select("-password");
        if(!profile){
            return res.status(400).json({msg: "There is no profile for this user"});
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});

// @route   GET api/profile
// @desc    Get all profiles
// @access  Private
router.get("/", adminauth, async (req, res)=>{
    try {
        const profiles = await User.find().select("-password");
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/profile/:user_id
// @desc    Get profile by user id
// @access  Private
router.get("/:user_id", adminauth, async (req, res)=>{
    try {
        const profile = await User.findOne({_id: req.params.user_id }).select("-password");
        if(!profile){
            return res.status(400).json({ msg: "Profile not found"});
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Profile not found"}); 
        }
        res.status(500).send("Server Error");
    }
});


module.exports = router;