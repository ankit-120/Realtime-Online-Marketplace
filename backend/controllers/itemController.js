import cloudinary from "../config/cloudinaryConfig.js";
import { Item } from "../models/itemModel.js";

export const addItem = async (req, res, next) => {
    try {
        const { name, price, description } = JSON.parse(req.body.data);

        //upload image to clodinary if it is present
        let image = "default.png";
        if (req.files) {
            const file = req.files.image;
            await cloudinary.uploader.upload(
                file.tempFilePath,
                (error, result) => {
                    console.log("error ", error);
                    console.log("result ", result);
                    image = result.url;
                }
            );
        }

        //creating item
        const item = await Item.create({
            name,
            price,
            image,
            description,
            seller: req.user,
            isSold: false,
        });

        //sending response
        res.status(201).json({
            success: true,
            message: "Item added successfully",
            item,
        });
    } catch (error) {
        next(error);
    }
};

//get all items except the items listed by logged in user
export const getAllItemsExcept = async (req, res, next) => {
    try {
        let search = {};
        if (req.query) {
            search = {
                name: {
                    $regex: req.query.keyword,
                    $options: "i",
                },
            };
        }
        const items = await Item.find(
            { seller: { $ne: req.user._id } },
            search
        );
        res.status(200).json({
            success: true,
            items,
        });
    } catch (error) {
        next(error);
    }
};

//get all items
export const getAllItems = async (req, res, next) => {
    try {
        let search = {};
        if (req.query) {
            search = {
                name: {
                    $regex: req.query.keyword,
                    $options: "i",
                },
            };
        }
        const items = await Item.find(search);
        res.status(200).json({
            success: true,
            items,
        });
    } catch (error) {
        next(error);
    }
};

//get item by id
export const getItemById = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const item = await Item.findOne({ _id: req.params.id });
        res.status(200).json({
            success: true,
            item,
        });
    } catch (error) {
        next(error);
    }
};

//buying the item
export const buyItem = async (req, res, next) => {
    try {
    } catch (error) {}
};