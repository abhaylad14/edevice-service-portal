const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: "1"
    }
})

module.exports = Brand = mongoose.model("brand", BrandSchema);