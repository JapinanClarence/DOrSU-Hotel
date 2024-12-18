import express from "express";
import {
    paymentValidationRules,
  reservationValidationRules,
  validate,
} from "../middleware/validator.js";
import {
  createReservation,
  deleteBooking,
  getBookings,
  getUserBookings,
  payReservation,
  updateBooking,
  updateStatus,
} from "../controller/bookingController.js";
import authenticate, { authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/booking",
  authenticate,
  authorizeRole("guest"),
  express.json(),
  reservationValidationRules(),
  validate,
  createReservation
);
router.get(
  "/:id/booking",
  authenticate,
  authorizeRole("guest"),
  getUserBookings
);
router.get("/booking", authenticate, authorizeRole("admin"), getBookings);
router.delete(
  "/booking/:id",
  authenticate,
  authorizeRole("guest"),
  deleteBooking
);

router.patch(
  "/booking/:id",
  authenticate,
  authorizeRole("guest", "admin"),
  express.json(),
  updateBooking
);

router.patch(
    "/booking/:id/payment",
    authenticate,
    authorizeRole("guest"),
    express.json(),
    paymentValidationRules(),
    validate,
    payReservation
  );

  router.patch(
    "/booking/:id/status",
    authenticate,
    authorizeRole("guest"),
    express.json(),
    updateStatus
  );
export default router;
