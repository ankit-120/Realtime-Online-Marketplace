import { Auction } from "../models/auctionModel.js";
import { Item } from "../models/itemModel.js";
import { wss } from "../app.js";
import { WebSocket } from "ws";
import setupWebSocketServer from "../websockets/wsServer.js";

export const addAuctionDetails = async (req, res, next) => {
    try {
        const { itemId, bidIncrement, timeLimit, endTime, startingPrice } =
            req.body;
        const item = await Item.findById(itemId);
        item.isAddedToAuction = true;
        await item.save();
        const auction = await Auction.create({
            item,
            bidIncrement,
            endTime,
            timeLimit,
            startingPrice,
            seller: req.user,
            // isSold: false,
        });

        const auctionStartTime = new Date();
        const auctionEndTime = new Date(
            auctionStartTime.getTime() + 1 * 60 * 1000
        );
        // wss.on("connection", (ws) => {
        // console.log("controller connect");
        // ws.send(JSON.stringify({ type: "create", value: 69 }));
        // wss.clients.forEach((client) => {
        //     console.log("loop");
        //     if (client.readyState === WebSocket.OPEN) {
        //         client.send(JSON.stringify({ type: "auction-end" }));
        //     }
        // });
        const checkAuctionEnd = () => {
            const currentTime = new Date();
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(
                        JSON.stringify({
                            type: "current-time",
                            value: currentTime,
                        })
                    );
                }
            });

            // Check if the auction has ended
            if (currentTime >= auctionEndTime) {
                // Auction has ended
                console.log("client size ", wss.clients.size);
                wss.clients.forEach((client) => {
                    console.log("times");
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: "auction-end" }));
                    }
                });

                // Clear the auction end timer
                clearInterval(auctionEndTimer);
            }
        };
        const auctionEndTimer = setInterval(checkAuctionEnd, 1000);
        // });

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
        const auctions = await Auction.find().populate("item");
        // await auctions.populate("item");
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
        const auctions = await Auction.find({
            seller: { $ne: req.user._id },
        }).populate("item");
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
        const auctions = await Auction.findOne({ _id: req.params.id }).populate(
            "item"
        );
        setupWebSocketServer(0);
        res.status(200).json({
            success: true,
            auctions,
        });
    } catch (error) {
        next(error);
    }
};
