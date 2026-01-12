import express from "express";
import { protect } from "../middleware/authMIddleware.js";
import { createBooking, getUserBookings, getHotelBookings, checkAvailabilityAPI } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityAPI);
bookingRouter.post("/book", protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/hotel", protect, getHotelBookings);

export default bookingRouter;
