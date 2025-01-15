import express from "express";
import {
  createRequest,
  getRequestsByCategory,
} from "../controllers/request.js";

const router = express.Router();

// Create request route
router.post("/", createRequest);

// Get requests by category ID
router.get("/", getRequestsByCategory);

export default router;
