import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/userRoute.js";
import itemRouter from "./routes/itemRoute.js";
import auctionRoute from "./routes/auctionRoute.js";
import bidRoute from "./routes/bidRoutes.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import http from "http";
import setupWebSocketServer from "./websockets/wsServer.js";
import { WebSocketServer } from "ws";

//environment variable config
dotenv.config({
    path: "./config/.env",
});

//database connection
connectDb();

//creating app
const app = express();
const server = http.createServer(app);

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
app.use("/api/bid", bidRoute);

//set up websocket server
export const wss = new WebSocketServer({ server });
setupWebSocketServer();

app.use(errorMiddleware);

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log("Listening to port ", PORT);
});
