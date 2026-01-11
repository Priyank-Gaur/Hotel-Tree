import Hotel from "../models/Hotel.js";
import {v2 as cloudinary} from "cloudinary";
import {Room} from "../models/Room.js";

//API to create a new room 
export const createRoom = async (req, res) => {
    try {
        const {roomType, pricePerNight, amenities} = req.body;
        const hotel = await Hotel.findOne({owner : req.auth.userId});
        if(!hotel){
            return res.json({success : false, message : "Hotel Not Found"})
        }
        //upload image
        const uploadImage = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        })  
        //we will wait for all images to complete uploading
        const images = await Promise.all(uploadImage);
        
        await Room.create({
            hotel : hotel._id,
            roomType, 
            pricePerNight : +pricePerNight, //plus will create the price coming in string into number
            amenities: JSON.parse(amenities),
            images,
        });
        return res.json({success : true, message : "Room Created"})
    } catch (error) {
        return res.json({success : false, message : error.message})
    }
}



//API to get all rooms
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({isAvailable : true }).populate({
            path : "hotel",
            populate : {
                path : "owner",
                select : "image"
            }   
        }).sort({createdAt : -1});
        return res.json({success : true, rooms})
    } catch (error) {
        return res.json({success : false, message : error.message})
    }
}


//API to get all rooms of a specific hotel
export const getOwnerRooms = async (req, res) => {
    try {
        const hotelData = await Hotel({owner : req.auth.userId})
        const rooms = await Room.find({hotel : hotelData._id.toString()}).populate('hotel')
        return res.json({success : true, rooms})
    } catch (error) {
        return res.json({success : false, message : error.message})
    }
}


//Api to toggle room availability
export const toggleRoomAvailability = async (req, res) => {
    try {
        const {roomId} = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        return res.json({success : true, message : "Room Availability Toggled"})
    } catch (error) {
        return res.json({success : false, message : error.message})
    }
}



    