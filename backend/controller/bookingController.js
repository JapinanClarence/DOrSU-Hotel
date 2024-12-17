import Reservation from "../model/Reservation.js";
import UserModel from "../model/User.js";
import Rooms from "../model/Rooms.js";

export const createReservation = async (req, res, next) => {
  const user = req.user.userId;
  try {
    const { guestCount, room, checkIn, checkOut } = req.body;

    const isExisted = await Rooms.findById(room);

    if (!isExisted) {
      res.status(404).json({
        success: false,
        message: "Room does not exists",
      });
    }

    await Reservation.create({
      user,
      room,
      checkIn,
      checkOut,
      numberOfGuests: guestCount,
    });

    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

