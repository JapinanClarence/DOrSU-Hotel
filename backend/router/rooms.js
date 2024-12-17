import express from "express"
import { searchRoom } from "../controller/roomsController.js";


const router = express.Router();

router.get("/rooms", searchRoom );



export default router;