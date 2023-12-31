// middleware/reqAuth.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const secretKey = 'secret@123'; // You can add any secret key here, same as used in loginRoutes.js

const reqAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token is required", success: false });
    }

    const token = authorization.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token, secretKey);
        const user = await User.findById(decodedToken._id);

        if (!user) {
            return res.status(401).json({ error: "User not found", success: false });
        }

        req.user = user; // Set the user in req for future use
        next();
    } catch (error) {
        console.error("Error in reqAuth middleware:", error);
        res.status(401).json({ error: "Request is not authorized", success: false, details: error.message });
    }
};

module.exports = reqAuth;