const mongoose = require("mongoose");

const ComplainSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
    photo:{
        type: String
    },
    brand:{
        type: String,
        required: true
    },
    modelname:{
        type: String,
        required: true
    },
    modelno:{
        type: String,
        required: true
    },
    status:{
        type: Number,
        default: "0"
    },
    pickupuser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: false
    },
    deliveryuser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: false
    },
    repaireruser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: false
    },
    estimate:{
        type: Number,
        required: false
    }

});

module.exports = Complain = mongoose.model("complain", ComplainSchema);
