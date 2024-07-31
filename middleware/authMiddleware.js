const {
    verifyToken
} = require("../utils/token");

async function authMiddleware(req, res, next) {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
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
    console.log(payload);
    req.uid = payload.uid;
    next();
}
module.exports = authMiddleware;