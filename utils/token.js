const jwt = require("jsonwebtoken");

function createToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

function verifyToken(accessToken) {
    try {
        return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch(error) {
        console.log("verify token failed");
        console.log("Error: ", error);
        return false;
    }
    
}

module.exports = {
    createToken,
    verifyToken
}