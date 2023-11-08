import mongoose from "mongoose";

const schema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, "Please provide amount"],
    },
    bidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
    },
});

export const Bid = mongoose.model("Bid", schema);
