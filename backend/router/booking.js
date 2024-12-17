import express from "express";
import { reservationValidationRules, validate } from "../middleware/validator.js";
import { createReservation, getBookings, getUserBookings } from "../controller/bookingController.js";
import authenticate, { authorizeRole } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/booking", authenticate, authorizeRole("guest"), express.json(), reservationValidationRules(), validate, createReservation);
router.get("/:id/booking", authenticate, authorizeRole("guest"), getUserBookings);
router.get("/booking",authenticate, authorizeRole("admin"), getBookings );
export default router;
