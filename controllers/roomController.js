import asyncHandler from "express-async-handler";
import dotenv from "dotenv"
import io from "../socket.js";
dotenv.config();
const key = process.env.ACCESS_KEY || "learningSessions";

// @desc Create Socket Room Using Test Id
// @route POST /handleRooms/create
// @access public
const create = asyncHandler(async (req,res)=>{
    const {testId,accessKey} = req.body;
    if(key !== accessKey){
        res.status(401);
        throw new Error("pls provide valid key");
    }
    // const newRoom = io.of(testId);
    console.log("room created with ",testId);
    console.log(io.sockets.adapter.rooms);
    res.status(200).json({});
});


export {create};