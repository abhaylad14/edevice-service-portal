const express = require("express");
const Complain = require("../../models/Bill");
const router = express.Router();
const auth = require("../../middleware/auth");
const {check,validationResult} = require("express-validator");

// @route   GET api/bills/
// @desc    View all the bills - admin side
// @access  Private
router.get("/", auth, async (req, res)=>{
    try {
        const bills = await Bill.find();
        res.json(bills);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
