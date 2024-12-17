import express from "express";
import { reservationValidationRules, validate } from "../middleware/validator.js";
import { createReservation, getUserBookings } from "../controller/bookingController.js";
import authenticate, { authorizeRole } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/book", authenticate, authorizeRole("guest"), express.json(), reservationValidationRules(), validate, createReservation);
router.get("/book", authenticate, authorizeRole("guest"), getUserBookings);
export default router;
