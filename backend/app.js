import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

//environment variable config
dotenv.config({
    path: "./config/.env",
});

//database connection
// connectDb();

//creating app
const app = express();

app.use(errorMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Listening to port ", PORT);
});
