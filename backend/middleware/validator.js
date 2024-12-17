import { body, validationResult } from "express-validator";

export const userValidationRules = () => [
  body("firstname").notEmpty().withMessage("Firstname is required"),
  body("lastname").notEmpty().withMessage("Lastname is required"),
  body("username").notEmpty().withMessage("Username is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const reservationValidationRules = () => [
  body("checkIn").notEmpty().withMessage("Check in is required"),
  body("checkOut").notEmpty().withMessage("Check out is required"),
  body("guestCount").notEmpty().withMessage("Guest count is required"),
];
// Middleware to handle validation errors
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((error) => error.msg),
    });
  }
  next();
};
