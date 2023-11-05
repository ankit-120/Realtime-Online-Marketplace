import express from "express";
import {
    addItem,
    getAllItems,
    getAllItemsExcept,
    getItemById,
} from "../controllers/itemController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", isLoggedIn, addItem);
router.get("/logged/all", isLoggedIn, getAllItemsExcept);
router.get("/items/all", getAllItems);
router.get("/get/:id", getItemById);

export default router;
