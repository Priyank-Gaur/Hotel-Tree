import mongoose from 'mongoose';
import Hotel from './server/models/Hotel.js';
import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });

const updateHotels = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        const result = await Hotel.updateMany(
            { country: { $exists: false } },
            { $set: { country: "India" } } // Defaulting to India as requested/implied
        );

        console.log(`Updated ${result.modifiedCount} hotels with default country 'India'.`);
        process.exit();
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
};

updateHotels();
