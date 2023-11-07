import express from "express";
import {
    addItem,
    buyItem,
    getAllItems,
    getAllItemsExcept,
    getItemById,
    getMyProducts,
} from "../controllers/itemController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", isLoggedIn, addItem);
router.get("/logged/all", isLoggedIn, getAllItemsExcept);
router.get("/items/all", getAllItems);
router.get("/myProducts", isLoggedIn, getMyProducts);
router.get("/get/:id", getItemById);
router.post("/buy", isLoggedIn, buyItem);

export default router;
