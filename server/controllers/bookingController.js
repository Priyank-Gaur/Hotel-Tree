import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import transporter from "../configs/nodemailer.js";
//Check availability of room

const checkAvailability = async ({checkInDate, checkOutDate, room}) => {
    try {
        const bookings = await Booking.find({
            room,
            status: { $ne: 'cancelled' },
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
        const userId = req.user._id;
        const isAvailable = await checkAvailability({checkInDate, checkOutDate, room});
        if(!isAvailable){
            return res.json({success : false, message : "Room is not available"});
        }

        const roomData = await Room.findById(room).populate('hotel')
        const diffTime = Math.abs(new Date(checkOutDate) - new Date(checkInDate));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        

        let totalPrice = roomData.pricePerNight * (diffDays > 0 ? diffDays : 1);
        const booking = await Booking.create({
            user: userId,
            room,
            hotel : roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        });
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: req.user.email,
            subject: "Hotel Booking Details",
            html : `<h1>Your Booking has been confirmed</h1>
            <p>Dear ${req.user.name},</p>
            <p>Thank you for booking with us.</p>
            <ul>
            <li>Booking ID : ${booking._id}</li>
            <li>Booking Date : ${booking.createdAt}</li>
            <li>Booking Status : ${booking.status}</li>
            <li>Booking Check In Date : ${booking.checkInDate}</li>
            <li>Booking Check Out Date : ${booking.checkOutDate}</li>
            <li>Booking Guests : ${booking.guests}</li>
            <li>Booking Total Price : $${booking.totalPrice}</li>
            </ul>
            <p>We look forward to seeing you at our hotel.</p>
            <p>If you have any questions or concerns, please do not hesitate to contact us.</p>
            <p>Thank you for choosing our hotel.</p>
            <p>Best regards</p>
            <p>HotelTree</p>
            `,
        }
        try {
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
        }

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

export const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const userId = req.user._id;

        const booking = await Booking.findById(bookingId);
        if(!booking){
            return res.json({success : false, message : "Booking not found"});
        }

        if(booking.user.toString() !== userId.toString()){
            return res.json({success : false, message : "Not authorized to cancel this booking"});
        }

        booking.status = "cancelled";
        await booking.save();

        return res.json({success : true, message : "Booking Cancelled"});
    } catch (error) {
        return res.json({success : false, message : "Failed to cancel booking"});
    }
}