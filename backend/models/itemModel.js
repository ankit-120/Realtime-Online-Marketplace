import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
    },
    price: {
        type: Number,
        required: [true, "Please provide price"],
    },
    stock: {
        type: Number,
        required: [true, "Please provide price"],
    },
    image: {
        type: String,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    isSold: {
        type: Boolean,
    },
});

export const Item = mongoose.model("Item", schema);
