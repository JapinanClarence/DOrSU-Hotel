import express from "express"
import { getRooms, searchRoom } from "../controller/roomsController.js";
import authenticate, { authorizeRole } from "../middleware/authMiddleware.js";


const router = express.Router();


router.post("/rooms", authenticate, authorizeRole("guest"), searchRoom );

router.get("/rooms", authenticate, authorizeRole("guest", "admin"), getRooms );

export default router;