const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const createError = require("../error");


const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        next(createError(401,"You are not authenticated!"));
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            next(createError("Token is not Valid!"));            
        }
        req.user = user;
        next()
    });
});

module.exports = verifyToken;