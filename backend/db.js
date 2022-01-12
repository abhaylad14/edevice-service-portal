const mongoose = require('mongoose');
const config = require("config")
const mongoURI = config.get("mongoURI")

const connectToMongo = async ()=> {
    await mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Database successfully!");
    });
}

module.exports = connectToMongo;