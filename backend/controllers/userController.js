import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { customError } from "../utils/customError.js";

export const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        //check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return next(new customError("User already exists", 400));
        }

        //hashing password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        //creating user
        user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        //generating jwt token
        const token = jwt.sign(
            { id: user._id, name: user.name },
            process.env.SECRET_KEY
        );

        //sending response and attaching jwt token to cookie
        res.status(201)
            .cookie("token", token, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000,
                sameSite: "none",
                secure: true,
            })
            .json({
                success: true,
                message: "User Registered Successfully",
                user,
            });
    } catch (error) {
        console.log("Signup error ", error);
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new customError("Invalid username and password", 400));
        }

        //comparing password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new customError("Invalid username and password", 400));
        }

        const token = jwt.sign(
            { id: user._id, name: user.name },
            process.env.SECRET_KEY
        );

        //sending response and attaching jwt token to cookie
        res.status(201)
            .cookie("token", token, {
                httpOnly: true,
                maxAge: 30 * 60 * 1000,
                sameSite: "none",
                secure: true,
            })
            .json({
                success: true,
                message: "User Loggedin Successfully",
                user,
            });
    } catch (error) {
        console.log("Login error ", error);
        next(error);
    }
};

export const logout = (req, res) => {
    res.status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: "none",
            secure: true,
        })
        .json({
            success: false,
            message: "Loggedout successfully",
        });
};

export const getMyProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        next(error);
    }
};
