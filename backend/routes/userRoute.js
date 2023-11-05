import express from "express";
import { notLoggedIn } from "../middlewares/authMiddleware.js";
import { signUp } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", notLoggedIn, signUp);

export default router;
