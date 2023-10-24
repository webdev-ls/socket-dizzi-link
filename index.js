import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();
import errorHandler from "./middleware/errorHandler.js";
import roomsRouter from "./routes/handleRooms.js"
import io from "./socket.js"
const app = express();

app.use(json());
app.use(cors());

app.use("/handleRooms",roomsRouter);

app.use(errorHandler);