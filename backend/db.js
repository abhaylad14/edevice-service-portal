const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://root:root@cluster0.hycqd.mongodb.net/mern-stack-project?retryWrites=true&w=majority";

const connectToMongo = ()=> {
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Database successfully!");
    });
}

module.exports = connectToMongo;