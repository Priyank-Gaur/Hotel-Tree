import mongoose from "mongoose";


const roomSchema = new mongoose.Schema({
    hotel : {type : String, required : true, ref : "Hotel"},
    roomType : {type : String, required : true},
    pricePerNight : {type : Number, required : true},
    amenities : {type : Array, required : true},
    images : [{type: String}],
    isAvailable : {type : Boolean, default : true},
    maxGuests: {type: Number, required: true, default: 2},
}, {timestamps: true});

const Room = mongoose.model("Room", roomSchema);
export default Room;