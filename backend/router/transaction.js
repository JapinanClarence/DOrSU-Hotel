import express from "express";
import authenticate, {authorizeRole} from "../middleware/authMiddleware.js";
import { getTransactions } from "../controller/transactionsController.js";

const router = express.Router();

router.get("/transactions", authenticate, authorizeRole("guest"), getTransactions);

export default router;