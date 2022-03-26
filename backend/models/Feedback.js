const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
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
    status:{
        type: Number,
        required: false,
    }
});

module.exports = Feedback = mongoose.model("feedback", FeedbackSchema);
