import express from "express";
import { protect } from "../middleware/authMIddleware.js";
import upload from "../middleware/uploadMIddleware.js";
import { createRoom, getOwnerRooms, getRooms, toggleRoomAvailability, deleteRoom } from "../controllers/roomController.js";

const roomRouter = express.Router();

roomRouter.post("/",upload.array("images",4), protect, createRoom);
roomRouter.get("/",getRooms)
roomRouter.get("/owner",protect,getOwnerRooms)
roomRouter.post("/toggle-availability",protect,toggleRoomAvailability)
roomRouter.delete("/:roomId",protect,deleteRoom)

export default roomRouter;