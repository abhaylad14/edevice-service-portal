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
    4:  Service Accepted
    5:  Service Rejected
    6:  Waiting for pickup
    7:  Picked up
    8:  Delivered to the company
    9:  In service
    10: Shipped
    11: Out for delivery
    12: Delivered
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

// @route   POST api/complain/assign
// @desc    Complain assign route
// @access  Private
router.post("/assign", auth, [
    check("id", "Complain id is required").not().isEmpty(),
    check("pickupid", "Employee id is required").not().isEmpty(),
    check("servicemanid", "Employee id is required").not().isEmpty(),
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    try {
        const complain = await Complain.findByIdAndUpdate({_id: req.body.id },{pickupuser: req.body.pickupid,repaireruser: req.body.servicemanid});
        if(!complain){
            return res.status(400).json({ msg: "Complain not found"});
        }
        res.json({msg: "Employees assigned successfully!"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Cannot assign employee!"}); 
        }
        res.status(500).send("Server Error");
    }
});

// @route   POST api/complain/setestimate
// @desc    Set estimation route
// @access  Private
router.post("/setestimate", auth, [
    check("id", "Complain id is required").not().isEmpty(),
    check("estimate", "Estimate is required").not().isEmpty(),
    check("estimate", "Valid estimation is required").isNumeric()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    try {
        const complain = await Complain.findByIdAndUpdate({_id: req.body.id },{estimate: req.body.estimate});
        if(!complain){
            return res.status(400).json({ msg: "Complain not found"});
        }
        res.json({msg: "Estimate assigned successfully!"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Something went wrong!"}); 
        }
        res.status(500).send("Server Error");
    }
});

// @route   POST api/complain/acceptservice
// @desc    Service accept route
// @access  Private
router.post("/acceptservice", auth, [
    check("id", "Complain id is required").not().isEmpty()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    try {
        const complain = await Complain.findByIdAndUpdate({_id: req.body.id },{status: "4"});
        if(!complain){
            return res.status(400).json({ msg: "Complain not found"});
        }
        res.json({msg: "Service accepted successfully!"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Something went wrong!"}); 
        }
        res.status(500).send("Server Error");
    }
});

// @route   POST api/complain/rejectservice
// @desc    Service reject route
// @access  Private
router.post("/rejectservice", auth, [
    check("id", "Complain id is required").not().isEmpty()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    try {
        const complain = await Complain.findByIdAndUpdate({_id: req.body.id },{status: "5"});
        if(!complain){
            return res.status(400).json({ msg: "Complain not found"});
        }
        res.json({msg: "Service rejected successfully!"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Something went wrong!"}); 
        }
        res.status(500).send("Server Error");
    }
});

// @route   POST api/complain/updatepickupstatus
// @desc    Pick up status update route
// @access  Private
router.post("/updatepickupstatus", auth, [
    check("id", "Complain id is required").not().isEmpty(),
    check("status", "Status is not valid").isNumeric()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    try {
        const complain = await Complain.findByIdAndUpdate({_id: req.body.id },{status: req.body.status});
        if(!complain){
            return res.status(400).json({ msg: "Complain not found"});
        }
        res.json({msg: "Status updated successfully!"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Something went wrong!"}); 
        }
        res.status(500).send("Server Error");
    }
});

module.exports = router;