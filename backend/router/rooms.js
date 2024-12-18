import express from "express"
import { getRooms, searchRoom } from "../controller/roomsController.js";
import authenticate, { authorizeRole } from "../middleware/authMiddleware.js";


const router = express.Router();


router.post("/rooms", express.json(),searchRoom );

router.get("/rooms", getRooms );

export default router;