const jwt = require("jsonwebtoken");
const config = require("config");
const User  = require("../models/User");

module.exports = async(req, res, next) => {
    // get token from the header
    const token = req.header("x-auth-token");
    // check if not token
    if(!token){
        return res.status(401).json({msg: "No token, authorization denied!"});
    }

    // verify token
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user;
        const user = await User.findById({_id: decoded.user.id, usertype: 3});
        if(!user.usertype == 0) {
            return res.status(401).json({msg: "Invalid token, authorization denied!"});
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({msg: "Token is not valid!"})
    }
}