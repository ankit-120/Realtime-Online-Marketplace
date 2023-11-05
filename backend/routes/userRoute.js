import express from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/authMiddleware.js";
import { login, logout, signUp } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", isNotLoggedIn, signUp);
router.get("/login", isNotLoggedIn, login);
router.get("/logout", isLoggedIn, logout);

export default router;
