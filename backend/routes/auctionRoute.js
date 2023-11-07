import express from "express";
import {
    addAuctionDetails,
    getAllAuction,
} from "../controllers/auctionController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", isLoggedIn, addAuctionDetails);
router.get("/auctions/all", getAllAuction);
router.get("/logged/all", isLoggedIn, getAllAuction);

export default router;
