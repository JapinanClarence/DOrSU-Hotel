import UserModel from "../model/User.js";
import Rooms from "../model/Rooms.js";

export const searchRoom = async (req, res) => {
  const { category, capacity, bedType, rate } = req.body;

  try {
    // Build the $or query array dynamically
    const orConditions = [];

    if (category) orConditions.push({ category: category });
    if (capacity) orConditions.push({ capacity: { $gte: Number(capacity) } });
    if (bedType) orConditions.push({ bedType: bedType });
    if (rate) orConditions.push({ rate: { $lte: Number(rate) } });

    // Base condition to only include available rooms
    const query = { availability: "1" };

    // Add the $or conditions only if any filters are provided
    if (orConditions.length > 0) {
      query.$or = orConditions;
    }

    // Find rooms that are available and meet at least one of the conditions
    const rooms = await Rooms.find(query);

    return res.status(200).json({
      success: true,
      data: rooms,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find({availability:1 }).sort({createdAt: -1});

    if (rooms <= 0) {
      return res.status(200).json({
        success: false,
        message: "No rooms found",
      });
    }

    return res.status(200).json({
      success: true,
      data: rooms,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
