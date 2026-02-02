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

        const sampleCity = "Paris";
        const hotelsInCity = await Hotel.find({ city: sampleCity });
        console.log(`\nHotels in ${sampleCity}: ${hotelsInCity.length}`);
        
        for (const hotel of hotelsInCity) {
            const rooms = await Room.find({ hotel: hotel._id });
            console.log(`- Hotel: ${hotel.name}, Rooms: ${rooms.length}`);
            rooms.forEach(r => console.log(`  - ${r.roomType} ($${r.pricePerNight}) MaxGuests: ${r.maxGuests}`));
        }

    } catch (error) {
        console.error("Error:", error);
    } finally {
        process.exit();
    }
};

verify();
