import express from "express"
import { searchRoom } from "../controller/roomsController.js";
import authenticate, { authorizeRole } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/rooms", authenticate, authorizeRole("guest"), searchRoom );



export default router;