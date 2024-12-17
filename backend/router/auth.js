import express from "express"
import { userValidationRules, validate } from "../middleware/validator.js";
import { login, register } from "../controller/authController.js";

const router = express.Router();

router.post("/login",express.json(), login);
router.post("/register",express.json(), userValidationRules(), validate, register)



export default router;