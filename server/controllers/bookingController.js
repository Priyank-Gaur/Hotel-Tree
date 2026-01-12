import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
//Check availability of room

const checkAvailability = async ({checkInDate, checkOutDate, room}) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate : {$lte : checkOutDate},
            checkOutDate : {$gte : checkInDate}
        })
        if(bookings.length > 0){
            return false;
        }
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const checkAvailabilityAPI = async (req, res) => {
    try {
        const {checkInDate, checkOutDate, room} = req.body;
        const isAvailable = await checkAvailability({checkInDate, checkOutDate, room});
        return res.json({success : true, isAvailable});
    } catch (error) {
        return res.json({success : false, message : error.message});
    }
}


//API to create a new booking
export const createBooking = async (req, res) => {
    try {
        const {checkInDate, checkOutDate, room, guests} = req.body;
        const user = req.user._id;
        const isAvailable = await checkAvailability({checkInDate, checkOutDate, room});
        if(!isAvailable){
            return res.json({success : false, message : "Room is not available"});
        }

        const roomData = await Room.findById(room).populate('hotel')
        // Calculate difference in milliseconds
        const diffTime = Math.abs(new Date(checkOutDate) - new Date(checkInDate));
        // Convert to days
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // If checkIn and checkOut are same day (should be validated ideally), assume 1 night or 0 depending on logic, 
        // but typically booking is at least 1 night. If diffDays is 0, let's default to 1 or handle logic.
        // For now, let's trust the dates are at least 1 day apart or handle 0 as 1 day charge if business logic dictates, 
        // but physically it's 0 nights. Let's stick to standard math.
        
        let totalPrice = roomData.pricePerNight * (diffDays > 0 ? diffDays : 1);
        const booking = await Booking.create({
            user,
            room,
            hotel : roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        });
        return res.json({success : true, message : "Booking Created"});
    } catch (error) {
        return res.json({success : false, message : "Booking Failed"});
    }
}


//API to get all bookings of a user
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({user : req.user._id}).populate('room hotel').sort({createdAt : -1});
        return res.json({success : true, bookings});
    } catch (error) {
        return res.json({success : false, message : "Failed to get bookings"});
    }
}


export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({owner : req.auth.userId})
        if(!hotel){
            return res.json({success : false, message : "Hotel Not Found"})
        }
        const bookings = await Booking.find({hotel : hotel._id}).populate('room hotel user').sort({createdAt : -1});
        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
        
        return res.json({success : true, dashboardData : {totalBookings, totalRevenue, bookings}})


    } catch (error) {
        return res.json({success : false, message : "Failed to get Hotel bookings"});
    }
}