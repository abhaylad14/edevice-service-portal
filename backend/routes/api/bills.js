const express = require("express");
const Bill = require("../../models/Bill");
const router = express.Router();
const adminauth = require("../../middleware/adminauth");
const {check,validationResult} = require("express-validator");

// @route   GET api/bills/
// @desc    View all the bills - admin side
// @access  Private
router.get("/", adminauth, async (req, res)=>{
    try {
        const bills = await Bill.find();
        res.json(bills);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;