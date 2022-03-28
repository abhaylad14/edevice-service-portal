const express = require("express");
const router = express.Router();
const adminauth = require("../../middleware/adminauth");
const customerauth = require("../../middleware/customerauth");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult} = require("express-validator");

// @route   GET api/profile/me
// @desc    Get current user's profile (logged in user)
// @access  Private
router.get("/me", auth, async(req,res) => {
    let status = false;
    try {
        const profile = await User.findById({_id: req.user.id }).select("-password");
        if(!profile){
            return res.status(400).json({msg: "There is no profile for this user"});
        }
        status = true;
        console.log(profile)
        res.status(200).json({status, profile});
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});

// @route   POST api/profile/update
// @desc    update current user's profile (logged in user)
// @access  Private
router.post("/update", auth, 
    check("name", "Name is required").not().isEmpty(),
    check("mobile", "Mobile number must contains 10 digits").isLength({min:10, max:10}),
    check("pincode", "Pincode must contains 6 digits").isLength({min:6, max:6}),
    check("address", "Address is required").not().isEmpty()
,async(req,res) => {
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    let profile = await User.findById({_id: req.user.id});
      if (!profile) {
        return res.status(400).json({ errors: [{ msg: "Profile does not exists" }] });
      }
    try {
        await User.findByIdAndUpdate({_id: req.user.id}, {name: req.body.name, mobile: req.body.mobile, pincode: req.body.pincode, address: req.body.address});
        status = true;
        res.json({status, msg: "Profile updated successfully"});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "Server Error"});
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