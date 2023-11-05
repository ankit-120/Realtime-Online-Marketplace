import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isNotLoggedIn = (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        return res.status(400).json({
            success: false,
            message: "Logout first",
        });
    }

    next();
};

export const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Login first",
        });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await User.findById(decode.id);
    next();
};
