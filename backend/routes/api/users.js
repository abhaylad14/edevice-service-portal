const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route   POST api/users
// @desc    Registration route
// @access  Public
router.post("/", [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({min:8})
],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    const {name, email, password} = req.body;
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
        name, email, avatar, password
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
        res.json({token});
    })

    // res.send("User registered successfully");
    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;