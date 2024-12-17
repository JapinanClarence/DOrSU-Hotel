import Reservation from "../model/Reservation.js";
import UserModel from "../model/User.js";
import Rooms from "../model/Rooms.js";

export const createReservation = async (req, res, next) => {
  const user = req.user.userId;
  try {
    const { guestCount, room, checkIn, checkOut } = req.body;

    const isExisted = await Rooms.findById(room);

    if (!isExisted) {
      return res.status(404).json({
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

export const getUserBookings = async (req, res) => {
  const user = req.params.id;

  try {
    const reservation = await Reservation.find({ user }).populate("room");

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Room does not exists",
      });
    }

    const roomData = reservation.map((data) => {
      return {
        id: data.id,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        numberOfGuests: data.numberOfGuests,
        status: data.status,
        category: data.room.category,
        description: data.room.description,
        capacity: data.room.capacity,
        bedType: data.room.bedType,
        rate: data.room.rate,
      };
    });

    res.status(200).json({
      success: true,
      data: roomData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



export const getBookings = async (req, res) => {
    try {
      const reservation = await Reservation.find().populate("room user");
  
      if (!reservation) {
        return res.status(404).json({
          success: false,
          message: "Room does not exists",
        });
      }
  
      const roomData = reservation.map((data) => {
        return {
          id: data.id,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          numberOfGuests: data.numberOfGuests,
          status: data.status,
          category: data.room.category,
          description: data.room.description,
          capacity: data.room.capacity,
          bedType: data.room.bedType,
          rate: data.room.rate,
          firstname: data.user.firstname,
          lastname: data.user.lastname,
          middlename: data.user.middlename,
          email: data.user.email,
        };
      });
  
      res.status(200).json({
        success: true,
        data: roomData,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

  export const updateBooking = async (req, res) =>{
    const bookingId = req.params.id;

    try {
        const booking = await Reservation.findByIdAndUpdate(bookingId, req.body);

        if(!booking){
            return res.status(404).json({
                success: false,
                message: "Reservation not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Booking updated successfully"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
          });
    }
  }