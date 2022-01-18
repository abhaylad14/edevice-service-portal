const mongoose = require("mongoose");

const ComplainSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = Complain = mongoose.model("complain", ComplainSchema);