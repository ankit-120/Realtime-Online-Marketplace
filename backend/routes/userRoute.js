import express from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/authMiddleware.js";
import {
    getMyProfile,
    login,
    logout,
    signUp,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", isNotLoggedIn, signUp);
router.post("/login", isNotLoggedIn, login);
router.get("/logout", isLoggedIn, logout);
router.get("/my/profile", isLoggedIn, getMyProfile);

export default router;
