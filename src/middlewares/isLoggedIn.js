import config from "config";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const jwtSecretKey = config.get("JWT_SECRET_KEY");

export default async function isLoggedIn(req, res, next) {
    const token = req.header("x-auth-token");
    try {
        if (!token) {
            throw new Error("jwt not provided");
        }
        const decoded = jwt.verify(token, jwtSecretKey);
        const user = await User.findById(decoded._id);
        if (!user) {
            throw new Error("user not found");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message, data: null });
    }
}
