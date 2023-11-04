import express from "express";
import dotenv from "dotenv";

//environment variable config
dotenv.config({
    path: "./config/.env",
});

//creating app
const app = express();

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Listening to port ", PORT);
});
