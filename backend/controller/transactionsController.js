import Reservation from "../model/Reservation.js";
import UserModel from "../model/User.js";
import Rooms from "../model/Rooms.js";

export const getTransactions = async (req, res) => {
  const user = req.user.userId;

  try {
    const reservations = await Reservation.find({ user })
      .populate("room")
      .sort({ "logs.timestamp": -1 });

    if (!reservations) {
      return res.status(404).json({
        success: false,
        message: "Room does not exist",
      });
    }

    // Filter transactions based on logged events
    const transactionData = reservations.flatMap((reservation) => {
      return reservation.logs
        .map((log) => {
          if (log.eventType === "0") {
            const paymentMethod =
              log.details.paymentMethod === "1"
                ? "GCash"
                : log.details.paymentMethod === "2"
                ? "Card"
                : "Cash";

            return {
              id: reservation.id,
              title: "Payment transaction",
              message: `You've paid ${log.details.paymentAmount} via ${paymentMethod} for your room reservation on ${new Date(
                log.timestamp
              ).toLocaleString()}.`,
              timestamp: log.timestamp,
            };
          } else if (log.eventType === "1") {
            let statusMessage = "";
            if (log.details.status === "2") {
              statusMessage = `You've cancelled your reservation on ${new Date(
                log.timestamp
              ).toLocaleString()}.`;
            } else if (log.details.status === "3") {
              statusMessage = `You have checked out of your reservation on ${new Date(
                log.timestamp
              ).toLocaleString()}.`;
            }
            return {
              id: reservation.id,
              title: "Booking status",
              message: statusMessage,
              timestamp: log.timestamp,
            };
          }
          return null;
        })
        .filter(Boolean); // Remove any null results
    });

    if (transactionData.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No transactions found",
      });
    }

    res.status(200).json({
      success: true,
      data: transactionData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
