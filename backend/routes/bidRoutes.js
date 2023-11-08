import express from "express";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import { addBid, getHighestBid } from "../controllers/bidController.js";

const router = express.Router();

router.post("/create", isLoggedIn, addBid);
router.get("/get/highestbid/:id", getHighestBid);

export default router;
