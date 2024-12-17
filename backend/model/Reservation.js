import mongoose from "mongoose";
/**
 * 0 - Pending
 * 1 - confirmed
 * 2 - Cancelled
 * 3 - checkout
 */
const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  room:  { type: mongoose.Schema.ObjectId, ref: "Rooms"},
    checkIn : {
        type: Date, 
        required: [true, "Check in is required"]
    },
    checkOut :{
        type: Date, 
        required: [true, "Checkout is required"]
    },
    numberOfGuests:{
        adult: {
            type: Number, 
        },
        children:{
            type: Number
        }
    },
    status: {
        type: String,
        enum: ["0", "1", "2", "3"]
    }, 
    paymentMethod:{
        type: String,
        enum :["0", "1", "2"]
    },
    paymentAmount:{
        type: Number,
    }

}, {timestamps: true});

const Reservation = mongoose.model("Reservations", reservationSchema);

export default Reservation;
