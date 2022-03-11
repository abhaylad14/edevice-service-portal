const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
    complain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "complain",
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    paymentstatus:{
        type: Boolean,
        required: true
    }
})

module.exports = Bill = mongoose.model("bill", BillSchema);