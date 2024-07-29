const jwt = require("jsonwebtoken");

function createToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = createToken;