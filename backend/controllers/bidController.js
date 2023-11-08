import { Auction } from "../models/auctionModel.js";
import { Bid } from "../models/bidModel.js";
import { Item } from "../models/itemModel.js";

export const addBid = async (req, res, next) => {
    try {
        const { amount, itemId } = req.body;
        const item = await Item.findById(itemId);
        const bid = await Bid.create({
            amount,
            bidder: req.user,
            item,
        });
        res.status(201).json({
            success: true,
            message: "Bid created",
            bid,
        });
    } catch (error) {
        next(error);
    }
};

export const getHighestBid = async (req, res, next) => {
    try {
        // console.log(req.params.id);
        const auction = await Auction.findById(req.params.id);
        console.log("auction ", auction);
        const item = auction.item;
        console.log("item ", item);
        const bid = await Bid.findOne({ item: item })
            .sort({
                amount: -1,
            })
            .populate("bidder");
        console.log("bid ", bid);
        res.status(200).json({
            success: true,
            bid,
        });
    } catch (error) {
        next(error);
    }
};
