import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        select: false,
    },
    soldItems: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Item",
    },
    purchasedItems: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Item",
    },
});

export const User = mongoose.model("User", schema);
