import express from "express";
import { getRooms, searchRoom } from "../controller/roomsController.js";
import authenticate, { authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Middleware to validate query parameters
const validateQueryParams = (req, res, next) => {
  const { category, capacity, bedType, rate } = req.query;

  // Check if any query parameter exists
  if (category || capacity || bedType || rate) {
    req.queryValid = true;
  } else {
    req.queryValid = false;
  }

  next();
};

router.get(
  "/rooms",
  authenticate,
  authorizeRole("guest", "admin"),
  validateQueryParams,
  (req, res, next) => {
    if (req.queryValid) {
      // If query parameters exist, trigger searchRoom
      return searchRoom(req, res, next);
    } else {
      // Otherwise, trigger getRooms
      return getRooms(req, res, next);
    }
  }
);

export default router;
