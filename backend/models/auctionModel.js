import mongoose from "mongoose";

const schema = mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
    },
    bidIncrement: {
        type: Number,
        required: [true, "Field mandatory"],
    },
    endTime: {
        type: String,
        required: [true, "Field mandatory"],
    },
    timeLimit: {
        type: Number,
        required: [true, "Field mandatory"],
    },
    startingPrice: {
        type: Number,
        required: [true, "Field mandatory"],
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    isSold: {
        type: Boolean,
        default: false,
    },
});

export const Auction = mongoose.model("Auction", schema);
