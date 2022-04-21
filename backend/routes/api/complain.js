const express = require("express");
const Complain = require("../../models/Complain");
const router = express.Router();
const adminauth = require("../../middleware/adminauth");
const auth = require("../../middleware/auth");
const customerauth = require("../../middleware/customerauth");
const deliveryboy = require("../../middleware/deliveryboyauth");
const servicemanauth = require("../../middleware/servicemanauth");
const {check,validationResult} = require("express-validator");
const deliveryboyauth = require("../../middleware/deliveryboyauth");


/*
    Status for complains:
    0:  Pending
    1:  Accepted
    2:  Rejected
    3:  Waiting for pickup
    4:  Picked up
    5:  Delivered to the company
    6:  price approval pending
    7:  Service Accepted
    8:  Service Rejected
    9:  In service
    10: Shipped
    11: Out for delivery
    12: Delivered
*/

// @route   POST api/complain/add
// @desc    Complain Registration route
// @access  Private
router.post("/add", customerauth, [
    check("title", "Title is required").not().isEmpty(),
    check("desc", "Description is required").not().isEmpty(),
    check("brand", "Brand name is required").not().isEmpty(),
    check("modelname", "Model name is required").not().isEmpty(),
    check("modelno", "Model number is required").not().isEmpty(),
], async (req,res) => {
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    const { title, desc, photo, brand, modelname, modelno } = req.body;
    try{

    complain = new Complain({
        user: req.user.id,title, desc, photo, brand, modelname, modelno
    });
        await complain.save();
        status = true
        res.status(200).json({status, msg: "Complain registered successfully!"});
    }catch(err){
        console.error(err);
        res.status(500).json({msg:"Server error"});
    }
});

// @route   GET api/complain/
// @desc    Get all complains
// @access  Private
router.get("/", adminauth, async (req, res)=>{
    let status = false;
    try {
        const complains = await Complain.aggregate([
            { $lookup:
               {
                 from: 'users',
                 localField: 'user',
                 foreignField: '_id',
                 as: 'userdetails'
               },
             }
            ]);
        status = true;
        res.status(200).json({status,complains});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/complain/bills
// @desc    Get all complains for bills
// @access  Private
router.get("/bills", adminauth, async (req, res)=>{
    let status = false;
    try {
        let complains = await Complain.aggregate([
            { $lookup:
               {
                 from: 'users',
                 localField: 'user',
                 foreignField: '_id',
                 as: 'userdetails'
               },
             }
            ]);
        status = true;
        complains = complains.filter(row => (row.status >= 7));
        res.status(200).json({status,complains});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/complain/accepted
// @desc    Get all accepted complains
// @access  Private
router.get("/accepted", adminauth, async (req, res)=>{
    let status = false;
    try {
        let complains = await Complain.aggregate([
            { $lookup:
               {
                 from: 'users',
                 localField: 'user',
                 foreignField: '_id',
                 as: 'userdetails'
               },
             }
            ]);
            complains = complains.filter(row => (row.status == 1));
        status = true;
        res.status(200).json({status,complains});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/complain/mycomplains
// @desc    Get my all complains
// @access  Private
router.get("/mycomplains", customerauth, [
    check("id", "Request ID is required").not().isEmpty(),
],async (req, res)=>{
    let status = false;
    try {
        let complains = await Complain.aggregate([
            { $lookup:
               {
                 from: 'users',
                 localField: 'user',
                 foreignField: '_id',
                 as: 'userdetails'
               },
               
             }
            ]);
            complains = complains.filter(row => (row.user == req.user.id));
            // .find({user: req.user.id})
        status = true;
        res.status(200).json({status,complains});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/complain/getone
// @desc    Get complain by complain id (delivery boy side)
// @access  Private
router.post("/getone", auth, [
    check("id", "Request ID is required").not().isEmpty(),
], async (req, res)=>{
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        let complains = await Complain.aggregate([
            { $lookup:
               {
                 from: 'users',
                 localField: 'user',
                 foreignField: '_id',
                 as: 'userdetails'
               }
             }
            ]);
            complains = complains.filter(row => (row._id == req.body.id));
        if(!complains){
            return res.status(400).json({ msg: "Request not found"});
        }
        status = true;
        res.status(200).json({status, complains});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Request not found"}); 
        }
        res.status(500).send("Server Error");
    }
});

// @route   GET api/complain/viewrequest
// @desc    Get complain by complain id
// @access  Private
router.post("/viewrequest", customerauth, [
    check("id", "Request ID is required").not().isEmpty(),
], async (req, res)=>{
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        let complains = await Complain.aggregate([
            { $lookup:
               {
                 from: 'users',
                 localField: 'user',
                 foreignField: '_id',
                 as: 'userdetails'
               }
             }
            ]);
            complains = complains.filter(row => (row._id == req.body.id));
        if(!complains){
            return res.status(400).json({ msg: "Request not found"});
        }
        status = true;
        res.status(200).json({status, complains});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Request not found"}); 
        }
        res.status(500).send("Server Error");
    }
});

// @route   POST api/complain/accept
// @desc    Complain accept route
// @access  Private
router.post("/accept", adminauth, [
    check("id", "Complain id is required").not().isEmpty(),
], async (req,res) => {
    let status = false;
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
        status = true;
        res.status(200).json({ status, msg: "Complain accepted successfully!"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Complain not found"}); 
        }
        res.status(500).json({msg: "Server Error"});
    }
});

module.exports = router;

// @route   POST api/complain/reject
// @desc    Complain reject route
// @access  Private
router.post("/reject", adminauth, [
    check("id", "Complain id is required").not().isEmpty(),
], async (req,res) => {
    let status = false;
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
        status = true;
        res.status(200).json({status, msg: "Complain rejected successfully!"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Complain not found"}); 
        }
        res.status(500).json({msg: "Server Error"});
    }
});

// @route   POST api/complain/assignserviceman
// @desc    Complain assign serviceman route
// @access  Private
router.post("/assignserviceman", adminauth, [
    check("cid", "Complain id is required").not().isEmpty(),
    check("sid", "Employee id is required").not().isEmpty(),
], async (req,res) => {
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    try {
        const complain = await Complain.findByIdAndUpdate({_id: req.body.cid },{serviceman: req.body.sid});
        if(!complain){
            return res.status(400).json({ msg: "Complain not found"});
        }
        status = true;
        res.status(200).json({status,msg: "Serviceman assigned successfully!"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Cannot assign Serviceman!"}); 
        }
        res.status(500).send("Server Error");
    }
});

// @route   POST api/complain/assignpickup
// @desc    Complain assign pick up route
// @access  Private
router.post("/assignpickup", adminauth, [
    check("cid", "Complain id is required").not().isEmpty(),
    check("pid", "Employee id is required").not().isEmpty(),
], async (req,res) => {
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    try {
        const complain = await Complain.findByIdAndUpdate({_id: req.body.cid },{pickupuser: req.body.pid});
        if(!complain){
            return res.status(400).json({ msg: "Complain not found"});
        }
        status = true;
        res.status(200).json({status,msg: "Pick up boy assigned successfully!"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Cannot assign Pick up boy!"}); 
        }
        res.status(500).send("Server Error");
    }
});

// @route   POST api/complain/assigndelivery
// @desc    Complain assign delivery boy route
// @access  Private
router.post("/assigndelivery", adminauth, [
    check("cid", "Complain id is required").not().isEmpty(),
    check("did", "Employee id is required").not().isEmpty(),
], async (req,res) => {
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    try {
        const complain = await Complain.findByIdAndUpdate({_id: req.body.cid },{deliveryuser: req.body.did, status: 3});
        if(!complain){
            return res.status(400).json({ msg: "Complain not found"});
        }
        status = true;
        res.status(200).json({status,msg: "Delivery boy assigned successfully!"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Cannot assign Delivery boy!"}); 
        }
        res.status(500).send("Server Error");
    }
});


// @route   POST api/complain/setestimate
// @desc    Set estimation route
// @access  Private
router.post("/setestimate", servicemanauth, [
    check("id", "Complain id is required").not().isEmpty(),
    check("chklist", "Checklist is required").not().isEmpty(),
    check("estimate", "Estimate is required").not().isEmpty()
], async (req,res) => {
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    try {
        const complain = await Complain.findByIdAndUpdate({_id: req.body.id },{estimate: req.body.estimate, chklist: req.body.chklist, status: 6});
        if(!complain){
            return res.status(400).json({ msg: "Complain not found"});
        }
        status = true;
        res.status(200).json({status, msg: "Estimate assigned successfully!"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Something went wrong!"}); 
        }
        res.status(500).json({msg: "Server Error"});
    }
});

// @route   POST api/complain/acceptservice
// @desc    Service accept route
// @access  Private
router.post("/acceptservice", customerauth, [
    check("id", "Complain id is required").not().isEmpty()
], async (req,res) => {
    let status = false
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    try {
        const complain = await Complain.findByIdAndUpdate({_id: req.body.id },{status: "7"});
        if(!complain){
            return res.status(400).json({ msg: "Complain not found"});
        }
        status = true;
        res.status(200).json({status, msg: "Service accepted successfully!"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Something went wrong!"}); 
        }
        res.status(500).json({msg: "Server Error"});
    }
});

// @route   POST api/complain/rejectservice
// @desc    Service reject route
// @access  Private
router.post("/rejectservice", customerauth, [
    check("id", "Complain id is required").not().isEmpty()
], async (req,res) => {
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    try {
        const complain = await Complain.findByIdAndUpdate({_id: req.body.id },{status: "8"});
        if(!complain){
            return res.status(400).json({ msg: "Complain not found"});
        }
        status = true;
        res.status(200).json({status, msg: "Service rejected successfully!"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Something went wrong!"}); 
        }
        res.status(500).json({msg: "Server Error"});
    }
});

// @route   POST api/complain/startservice
// @desc    Service start route
// @access  Private
router.post("/startservice", servicemanauth, [
    check("id", "Complain id is required").not().isEmpty()
], async (req,res) => {
    let status = false
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    try {
        const complain = await Complain.findByIdAndUpdate({_id: req.body.id },{status: "9"});
        if(!complain){
            return res.status(400).json({ msg: "Complain not found"});
        }
        status = true;
        res.status(200).json({status, msg: "Service started successfully!"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Something went wrong!"}); 
        }
        res.status(500).json({msg: "Server Error"});
    }
});

// @route   POST api/complain/completeservice
// @desc    Service completed route
// @access  Private
router.post("/completeservice", servicemanauth, [
    check("id", "Complain id is required").not().isEmpty()
], async (req,res) => {
    let status = false
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    try {
        const complain = await Complain.findByIdAndUpdate({_id: req.body.id },{status: "10"});
        if(!complain){
            return res.status(400).json({ msg: "Complain not found"});
        }
        status = true;
        res.status(200).json({status, msg: "Service Completed successfully!"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Something went wrong!"}); 
        }
        res.status(500).json({msg: "Server Error"});
    }
});

// @route   POST api/complain/updatestatus
// @desc    Pick up and delivery status update route
// @access  Private
router.post("/updatestatus", deliveryboyauth, [
    check("id", "Complain id is required").not().isEmpty(),
    check("status", "Status is not valid").isNumeric()
], async (req,res) => {
    let status = false;
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
        status = true;
        res.json({status, msg: "Status updated successfully!"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Something went wrong!"}); 
        }
        res.status(500).send("Server Error");
    }
});

// @route   POST api/complain/delete
// @desc    Deletes the complain
// @access  Private
router.post("/delete", customerauth, [
    check("id", "Request ID is required").not().isEmpty()
], async (req,res) => {
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const request = await Complain.findByIdAndDelete({_id: req.body.id})
        status = true;
        res.status(200).json({status, msg: "Request has been deleted successfully!"});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "Server Error!"});
    }
});

// @route   GET api/complain/pickuprequests
// @desc    Get all pick up requests
// @access  Private
router.get("/pickuprequests", deliveryboyauth, async (req, res)=>{
    let status = false;
    try {
        let complains = await Complain.aggregate([
            { $lookup:
               {
                 from: 'users',
                 localField: 'user',
                 foreignField: '_id',
                 as: 'userdetails'
               },
             }
            ]);
        complains = complains.filter(row => (row.pickupuser == req.user.id));
        complains = complains.filter(row => (row.status  >= 3 && row.status <= 5));
        status = true;
        res.status(200).json({status,complains});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/complain/servicerequests
// @desc    Get all service requests
// @access  Private
router.get("/servicerequests", servicemanauth, async (req, res)=>{
    let status = false;
    try {
        let complains = await Complain.aggregate([
            { $lookup:
               {
                 from: 'users',
                 localField: 'user',
                 foreignField: '_id',
                 as: 'userdetails'
               },
             }
            ]);
        complains = complains.filter(row => (row.serviceman == req.user.id));
        complains = complains.filter(row => (row.status  >= 5 && row.status <= 10));
        status = true;
        res.status(200).json({status,complains});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/complain/deliveryrequests
// @desc    Get all delivery requests
// @access  Private
router.get("/deliveryrequests", deliveryboyauth, async (req, res)=>{
    let status = false;
    try {
        let complains = await Complain.aggregate([
            { $lookup:
               {
                 from: 'users',
                 localField: 'user',
                 foreignField: '_id',
                 as: 'userdetails'
               },
             }
            ]);
        complains = complains.filter(row => (row.pickupuser == req.user.id));
        complains = complains.filter(row => (row.status  >= 10 && row.status < 12));
        status = true;
        res.status(200).json({status,complains});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;