import mongoose from "mongoose";
/**
 * category:
 * 0 - non-air
 * 1 - air conditioned
 * availability:
 * 0 - not available
 * 1 - available
 * bed Type:
 * 0 - single
 * 1 - double
 * 2 - queen
 * 3 - king
 */
const roomsSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["0", "1"],
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
  },
  { timestamps: true }
);

const Rooms = mongoose.model("Rooms", roomsSchema);

export default Rooms;
