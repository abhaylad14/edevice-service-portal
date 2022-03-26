const express = require("express");
const Feedback = require("../../models/Feedback");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const customerauth = require("../../middleware/customerauth");
const adminauth = require("../../middleware/adminauth");




// @route   POST api/feedback/addfeedback/
// @desc    feedback  route
// @access  Private
router.post("/addfeedback", customerauth, [
    check("title", "Title is required").not().isEmpty(),
    check("desc", "Description is required").not().isEmpty(),
], async (req,res) => {
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log(req.body);
    const {title, desc } = req.body;
    try{

    feedback = new Feedback({
        user: req.user.id, title, desc
    });
        await feedback.save();
        status=true
        res.status(200).json({status, msg: "feedback registered successfully!"});
    }catch(err){
        console.error(err);
        res.status(500).json({msg:"Server error"});
    }
});

// @route   GET api/feedback/
// @desc    Get all feedback
// @access  Private
router.get("/", adminauth, async (req, res)=>{
    let status = false;
    try {
        const feedbacks = await Feedback.find();
        status = true;
        res.status(200).json({status,feedbacks});
       
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



// @route   GET api/feedback/:feedback_id
// @desc    Get feedback by feedback id
// @access  Private
router.get("/:feedback_id", adminauth, async (req, res)=>{
    try {
        const feedback = await Feedback.findOne({_id: req.params.feedback_id });
        if(!feedback){
            return res.status(400).json({ msg: "feedback not found"});
        }
        res.json(feedback);
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "feedback not found"}); 
        }
        res.status(500).send("Server Error");
    }
});


// @route   POST api/feedback/deletefeedback
// @desc    Deletes the feedback
// @access  Private
router.post("/deletefeedback", adminauth, [
    check("id", "feedback is required").not().isEmpty()
], async (req,res) => {
    let status=false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const user = await Feedback.findByIdAndDelete({_id: req.body.id})
        status = true;
        res.status(200).json({status, msg: "feedback has been deleted successfully!"});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "Server Error!"});
    }
});

module.exports = router;