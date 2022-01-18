;const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    pincode:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        default: "1"
    }
})

module.exports = User = mongoose.model('user', UserSchema);