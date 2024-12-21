import mongoose from "mongoose";

/**
 * category:
 * 0 - Standard
 * 1 - Suite
 * 2 - Family
 * availability:
 * 0 - not available
 * 1 - available
 * bed Type:
 * 0 - single
 * 1 - double
 * 2 - queen
 * 3 - king
* specialOffers:
 * 0 - discount 
 * 1 - free wifi 
 * 2 - free breakfast 
 * 3 - Free Parking
 * 4 - Welcome Drinks or Snacks
 * 5 - Early Check-In / Late Check-Out
 */
const roomsSchema = new mongoose.Schema(
  {
    name: {type: String, required:[true, "Room name is required"]},
    category: {
      type: String,
      enum: ["0", "1", "2"],
    },
    availability: {
      type: String,
      enum: ["0", "1"],
    },
    description: {
      type: String,
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
    },
    bedType: {
      type: String,
      enum: ["0", "1", "2", "3"],
    },
    rate: {
      type: Number,
      required: [true, "Rate is required"],
    },
    specialOffers: [
      {
        type: { type: String, enum: ["0", "1", "2", "3", "4", "5"] }, // e.g., "Free Breakfast", "10% Discount"
        description: { type: String }, // Optional description of the offer
        discount: { type: Number, min: 0, max: 100 }, // Percentage discount, e.g., 10 for 10%
        active: { type: Boolean, default: true }, // Whether the offer is currently active
      },
    ],
  },
  { timestamps: true }
);

const Rooms = mongoose.model("Rooms", roomsSchema);

export default Rooms;
