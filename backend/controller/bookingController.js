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

    if (isExisted.availability == "0") {
      return res.status(400).json({
        success: false,
        message: "Rooms is not available.",
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
    const reservation = await Reservation.find({
      user,
      status: { $in: [0, 1, 4] },
    })
      .populate("room")
      .sort({ createdAt: -1 });

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

export const findBooking = async (req, res) => {
  const bookingId = req.params.id;

  try {
    const reservation = await Reservation.findById(bookingId).populate("room");

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Room does not exists",
      });
    }

    const roomData = {
      id: reservation.id,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      numberOfGuests: reservation.numberOfGuests,
      status: reservation.status,
      category: reservation.room.category,
      description: reservation.room.description,
      capacity: reservation.room.capacity,
      bedType: reservation.room.bedType,
      rate: reservation.room.rate,
    };

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

export const deleteBooking = async (req, res) => {
  const bookingId = req.params.id;

  try {
    const booking = await Reservation.findByIdAndDelete(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }
    const updateRoom = await Rooms.findByIdAndUpdate(booking.room, {
      availability: "1",
    });

    if (!updateRoom) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const payReservation = async (req, res) => {
  const bookingId = req.params.id;
  const { paymentAmount, paymentMethod } = req.body;

  try {
    // Find the reservation
    const booking = await Reservation.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    if (booking.status != "1") {
      return res.status(400).json({
        success: false,
        message: "Reservation is waiting for approval, please try again later.",
      });
    }

    const room = await Rooms.findById(booking.room);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Calculate discounted price
    const activeDiscount = room.specialOffers?.find(
      (offer) => offer.active && offer.discount
    );

    const discountAmount = activeDiscount
      ? (room.rate * activeDiscount.discount) / 100
      : 0;

    const discountedPrice = room.rate - discountAmount;

    if (paymentAmount !== discountedPrice) {
      return res.status(400).json({
        success: false,
        message: `Payment amount does not match the discounted price. Please pay the correct amount of ${discountedPrice}.`,
      });
    }

    // Update payment details
    booking.paymentAmount = paymentAmount;
    booking.paymentMethod = paymentMethod;
    booking.status = "4";

    // Add a log entry for the payment
    booking.logs.push({
      eventType: "0", // Event type 0 for payments
      details: {
        paymentAmount,
        paymentMethod,
        discountApplied: activeDiscount
          ? `${activeDiscount.discount}% (${discountAmount})`
          : "No discount",
        status: "4", // Explicitly log the payment status
      },
      timestamp: new Date(),
    });

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Payment successful",
      data: booking,
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during payment processing.",
    });
  }
};


export const updateStatus = async (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;

  try {
    // Find the reservation
    const booking = await Reservation.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    if (booking.status !== "1" && booking.status !== "4") {
      return res.status(400).json({
        success: false,
        message: "Current reservation is not active",
      });
    }
    // Update status
    booking.status = status;

    // Add a log entry for the payment
    booking.logs.push({
      eventType: "1",
      details: {
        status: status,
      },
      timestamp: new Date(),
    });

    // Save the updated reservation
    await booking.save();

    const updateRoom = await Rooms.findByIdAndUpdate(booking.room, {
      availability: "1",
    });

    if (!updateRoom) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**Admin Booking Controller */
export const updateBooking = async (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;
  try {
    const booking = await Reservation.findByIdAndUpdate(bookingId, { status });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }
    //update room availability
    const availability = status === "1" ? "0" : "1";

    const updateRoom = await Rooms.findByIdAndUpdate(booking.room, {
      availability,
    });

    if (!updateRoom) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
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
    const reservation = await Reservation.find().populate("room user").sort({createdAt : -1});

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
        paymentAmount: data.paymentAmount,
        paymentMethod: data.paymentMethod,
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
