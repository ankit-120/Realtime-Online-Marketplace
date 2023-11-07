import { Auction } from "../models/auctionModel.js";
import { Item } from "../models/itemModel.js";

export const addAuctionDetails = async (req, res, next) => {
    try {
        const { itemId, bidIncrement, timeLimit, startingPrice } = req.body;
        const item = await Item.findById(itemId);
        const auction = await Auction.create({
            item,
            bidIncrement,
            timeLimit,
            startingPrice,
            seller: req.user,
            // isSold: false,
        });
        res.status(201).json({
            success: true,
            message: "Auction created successfully",
            auction,
        });
    } catch (error) {
        next(error);
    }
};

//get all auction
export const getAllAuction = async (req, res, next) => {
    try {
        const auctions = await Auction.find();
        res.status(200).json({
            success: true,
            auctions,
        });
    } catch (error) {
        next(error);
    }
};

//get all auction except for logged in user
export const getAllAuctionExcept = async (req, res, next) => {
    try {
        const auctions = await Auction.find({ seller: { $ne: req.user._id } });
        res.status(200).json({
            success: true,
            auctions,
        });
    } catch (error) {
        next(error);
    }
};

//get auction by id
export const getAuctionById = async (req, res, next) => {
    try {
        const auctions = await Auction.findOne({ _id: req.params.id });
        res.status(200).json({
            success: true,
            auctions,
        });
    } catch (error) {
        next(error);
    }
};
