import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hotel from './models/Hotel.js';
import Room from './models/Room.js';
import User from './models/User.js';

dotenv.config();

const verify = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/hotel_booking`);
        console.log("Connected to DB");

        const hotelCount = await Hotel.countDocuments({});
        const roomCount = await Room.countDocuments({});
        const userCount = await User.countDocuments({});

        console.log(`Total Hotels: ${hotelCount}`);
        console.log(`Total Rooms: ${roomCount}`);
        console.log(`Total Users: ${userCount}`);

        const sampleHotel = await Hotel.findOne({name: /Grand Hotel/});
        
        console.log("Testing Controller Query...");
        const rooms = await Room.find({isAvailable : true }).populate({
            path : "hotel",
            populate : {
                path : "owner",
                select : "image"
            }   
        }).sort({createdAt : -1}).limit(5);

        console.log(`Query found ${rooms.length} rooms.`);
        if (rooms.length > 0) {
            console.log("Top Room Created At:", rooms[0].createdAt);
            console.log("Top Room Hotel:", rooms[0].hotel ? rooms[0].hotel.name : "NULL");
            console.log("Top Room Hotel Owner:", (rooms[0].hotel && rooms[0].hotel.owner) ? rooms[0].hotel.owner : "NULL");
        }

    } catch (error) {
        console.error("Error:", error);
    } finally {
        process.exit();
    }
};

verify();
