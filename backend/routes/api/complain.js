const express = require("express");
const router = express.Router();

// @route   GET api/complain
// @desc    Test route
// @access  Public
router.get("/", (req,res) => res.send("Complain route"));
module.exports = router;