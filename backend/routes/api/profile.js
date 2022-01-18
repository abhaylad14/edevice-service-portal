const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult} = require("express-validator");

// @route   GET api/profile/me
// @desc    Get current user's profile (logged in user)
// @access  Private
router.get("/me", auth, async(req,res) => {
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
router.get("/", auth, async (req, res)=>{
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
router.get("/:user_id", auth, async (req, res)=>{
    try {
        const profile = await User.findOne({user: req.params.user_id }).select("-password");
        if(!profile){
            return res.status(400).json({ msg: "Profile not found"});
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            res.status(400).json({ msg: "Profile not found"}); 
        }
        res.status(500).send("Server Error");
    }
});

// @route   DELETE api/profile/:user_id
// @desc    Soft Delete profile 
// @access  Private
router.delete("/:user_id", auth, async (req, res)=>{
    try {
        await User.findOneAndUpdate({user: req.params.user_id}, {$set: {status: 0}});
        res.json({msg: "Profile deleted successfully"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            res.status(400).json({ msg: "Profile not found"}); 
        }
        res.status(500).send("Server Error");
    }
});

// @route   DELETE api/profile/restore/:user_id
// @desc    Restore Deleted profile 
// @access  Private
router.delete("/restore/:user_id", auth, async (req, res)=>{
    try {
        await User.findOneAndUpdate({user: req.params.user_id}, {$set: {status: 1}});
        res.json({msg: "Profile restored successfully"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            res.status(400).json({ msg: "Profile not found"}); 
        }
        res.status(500).send("Server Error");
    }
});

module.exports = router;