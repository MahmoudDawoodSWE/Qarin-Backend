import express from "express";
import {
  createRequest,
  getRequestsByCategory,
  getRequestsByUser,
} from "../controllers/request.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Create request route
router.post("/", createRequest);

// Get requests by category ID
router.get("/", getRequestsByCategory);

// Get orders by user ID
router.get("/user", getRequestsByUser);

export default router;
