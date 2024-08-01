const {
    verifyToken
} = require("../utils/token");

async function authMiddleware(req, res, next) {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        console.log("Access token not coming...", req.cookies);
        return res.status(401).json({
            message: "Lack of Valid Authentication"
        })
    }
    const payload = verifyToken(accessToken);
    if (!payload) {
        return res.status(401).json({
            message: "Invalid Authentication Token"
        })
    } 
    console.log("Token ",payload);
    req.uid = payload.uid;
    next();
}
module.exports = authMiddleware;