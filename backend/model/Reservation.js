import mongoose from "mongoose";
/**
 * 0 - Pending
 * 1 - confirmed
 * 2 - Cancelled
 * 3 - checkout
 * 4 - payed
 * 
 * payment method:
 * 0 - cash
 * 1 - gcash
 * 2 - card
 * 
 * event type:
 * 0 - payment
 * 1 - Status change
 */
const reservationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    room: { type: mongoose.Schema.ObjectId, ref: "Rooms" },
    checkIn: {
      type: Date,
      required: [true, "Check in is required"],
    },
    checkOut: {
      type: Date,
      required: [true, "Checkout is required"],
    },
    numberOfGuests: {
      adult: {
        type: Number,
      },
      children: {
        type: Number,
      },
    },
    status: {
      type: String,
      enum: ["0", "1", "2", "3", "4"],
      default: "0"
    },
    paymentMethod: {
      type: String,
      enum: ["0", "1", "2"],
    },
    paymentAmount: {
      type: Number,
    },
    logs:[
      {
        eventType: { type: String, enum: ["0", "1"]},
        details: { type: Object},
        timestamp: {type : Date, default: Date.now()}
      }
    ]
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservations", reservationSchema);

export default Reservation;
