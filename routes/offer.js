import express from "express";
import { createOffer, getOffersByOrder } from "../controllers/offer.js";

const router = express.Router();

// Route for creating an offer
router.post("/create", createOffer);

// Route for getting offers by order ID
router.get("/order/:orderId", getOffersByOrder);

export default router;
