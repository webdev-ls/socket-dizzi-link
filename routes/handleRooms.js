import { Router } from "express";
const roomsRouter = Router();
import { create } from "../controllers/roomController.js";

roomsRouter.route("/create").post(create);

export default roomsRouter