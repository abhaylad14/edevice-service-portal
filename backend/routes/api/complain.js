const express = require("express");
const Complain = require("../../models/Complain");
const router = express.Router();
const auth = require("../../middleware/auth");
const {check,validationResult} = require("express-validator");


/*
    Status for complains:
    0:  Pending
    1:  Accepted
    2:  Rejected
    3:  price approval pending
    4:  Waiting for pickup
    5:  Picked up
    6:  Deliverd to the company
*/

// @route   POST api/complain/add/
// @desc    Complain Registration route
// @access  Private
router.post("/add", auth, [
    check("title", "Title is required").not().isEmpty(),
    check("desc", "Description is required").not().isEmpty(),
    check("brand", "Brand name is required").not().isEmpty(),
    check("modelname", "Model name is required").not().isEmpty(),
    check("modelno", "Model number is required").not().isEmpty(),
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    const { user, title, desc, photo, brand, modelname, modelno } = req.body;
    try{

    complain = new Complain({
        user, title, desc, photo, brand, modelname, modelno
    });
        await complain.save();
        res.json({msg: "Complain registered successfully!"});
    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
});

// @route   GET api/complain/
// @desc    Get all complains
// @access  Private
router.get("/", auth, async (req, res)=>{
    try {
        const complains = await Complain.find();
        res.json(complains);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/complain/mycomplains
// @desc    Get my all complains
// @access  Private
router.get("/mycomplains", auth, async (req, res)=>{
    try {
        const complains = await Complain.find({user: req.user.id});
        res.json(complains);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/complain/:complain_id
// @desc    Get complain by complain id
// @access  Private
router.get("/:complain_id", auth, async (req, res)=>{
    try {
        const complain = await Complain.findOne({_id: req.params.complain_id });
        if(!complain){
            return res.status(400).json({ msg: "Complain not found"});
        }
        res.json(complain);
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Complain not found"}); 
        }
        res.status(500).send("Server Error");
    }
});

// @route   POST api/complain/accept
// @desc    Complain accept route
// @access  Private
router.post("/accept", auth, [
    check("id", "Complain id is required").not().isEmpty(),
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    try {
        const complain = await Complain.findByIdAndUpdate({_id: req.body.id }, {status: 1});
        if(!complain){
            return res.status(400).json({ msg: "Complain not found"});
        }
        res.json({msg: "Complain accepted successfully!"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Complain not found"}); 
        }
        res.status(500).send("Server Error");
    }
});

module.exports = router;

// @route   POST api/complain/reject
// @desc    Complain reject route
// @access  Private
router.post("/reject", auth, [
    check("id", "Complain id is required").not().isEmpty(),
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    try {
        const complain = await Complain.findByIdAndUpdate({_id: req.body.id }, {status: 2});
        if(!complain){
            return res.status(400).json({ msg: "Complain not found"});
        }
        res.json({msg: "Complain rejected successfully!"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Complain not found"}); 
        }
        res.status(500).send("Server Error");
    }
});

module.exports = router;