import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/userRoute.js";
import itemRouter from "./routes/itemRoute.js";
import auctionRoute from "./routes/auctionRoute.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";

//environment variable config
dotenv.config({
    path: "./config/.env",
});

//database connection
connectDb();

//creating app
const app = express();

//using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
    })
);
app.use(cors({ credentials: true, origin: true }));

//using routes
app.use("/api/user", userRoute);
app.use("/api/item", itemRouter);
app.use("/api/auction", auctionRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Listening to port ", PORT);
});
