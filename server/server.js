import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

connectDB();
connectCloudinary();


const app = express();
app.use(cors());

//middlewares
app.use(express.json());
app.use(clerkMiddleware());


//API to listen Clerk Webhooks
app.use('/api/clerk', clerkWebhooks);



app.get('/', (req, res) => {
    res.send("API working");
});
app.use("/api/user", userRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/room", roomRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/ai", aiRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;

