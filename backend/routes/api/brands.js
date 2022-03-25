const express = require("express");
const Brand = require("../../models/Brand");
const router = express.Router();
const adminauth = require("../../middleware/adminauth");
const { check, validationResult } = require("express-validator");

// @route   GET api/brands/
// @desc    View all the brands
// @access  Private
router.get("/", adminauth, async (req, res) => {
  let status = false;
  try {
    const brands = await Brand.find(  );
    status = true;
    res.status(200).json({ status, brands });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route   GET api/brands/getbrands
// @desc    View active the brands
// @access  Private
router.get("/getbrands", async (req, res) => {
  let status = false;
  try {
    const brands = await Brand.find({ status: 1 });
    status = true;
    res.status(200).json({ status, brands });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route   GET api/brands/addbrand
// @desc    Add new brands
// @access  Private
router.post(
  "/addbrand",
  adminauth,
  [check("name", "Brand name is required").not().isEmpty()],
  async (req, res) => {
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
      let brand = await Brand.findOne({ name:req.body.name });
      if (brand) {
        return res.status(400).json({ errors: [{ msg: "Brand already exists" }] });
      }
      brand = new Brand({name: req.body.name});
      await brand.save();
      status = true;
      res.status(200).json({ status, msg:"Brand added successfully!" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @route   POST api/brands/deletebrand
// @desc    Deletes the brand
// @access  Private
router.post("/deletebrand", adminauth, [
    check("id", "Brand ID is required").not().isEmpty()
], async (req,res) => {
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const brand = await Brand.findByIdAndDelete({_id: req.body.id})
        status = true;
        res.status(200).json({status, msg: "Brand has been deleted successfully!"});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "Server Error!"});
    }
});

// @route   POST api/brands/activate
// @desc    Restore Deleted brand 
// @access  Private
router.post("/activate", adminauth, [
    check("id", "Brand ID is required").not().isEmpty()
],async (req, res)=>{
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    let brand = await Brand.findOne({ _id:req.body.id });
      if (!brand) {
        return res.status(400).json({ errors: [{ msg: "Brand does not exists" }] });
      }
    try {
        await Brand.findByIdAndUpdate({_id: req.body.id}, {status: 1});
        status = true;
        res.json({status, msg: "Brand activated successfully"});
    } catch (err) {
        console.error(err.message);
        if(err.kind == "ObjectId"){
            res.status(400).json({ msg: "Brand not found"}); 
        }
        res.status(500).json({msg: "Server Error"});
    }
});

// @route   POST api/brands/deactivate
// @desc    Inactivate brand
// @access  Private
router.post("/deactivate", adminauth, [
    check("id", "Brand ID is required").not().isEmpty()
],async (req, res)=>{
    let status = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    let brand = await Brand.findOne({ _id:req.body.id });
      if (!brand) {
        return res.status(400).json({ errors: [{ msg: "Brand does not exists" }] });
      }
    try {
        await Brand.findByIdAndUpdate({_id: req.body.id}, {status: 0});
        status = true;
        res.json({status, msg: "Brand deactivated successfully"});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "Server Error"});
    }
});

// @route   POST api/brands/update
// @desc    update brand
// @access  Private
router.post("/update", adminauth, [
  check("id", "Brand ID is required").not().isEmpty(),
  check("name", "Brand name is required").not().isEmpty()
],async (req, res)=>{
  let status = false;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
  }
  let brand = await Brand.findOne({ _id:req.body.id });
    if (!brand) {
      return res.status(400).json({ errors: [{ msg: "Brand does not exists" }] });
    }
  try {
      await Brand.findByIdAndUpdate({_id: req.body.id}, {name: req.body.name});
      status = true;
      res.json({status, msg: "Brand name updated successfully"});
  } catch (err) {
      console.error(err.message);
      res.status(500).json({msg: "Server Error"});
  }
});

module.exports = router;
