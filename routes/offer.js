import express from "express";
import {
  acceptOffer,
  createOffer,
  getOffersByOrder,
  rejectOffer,
} from "../controllers/offer.js";

const router = express.Router();

// Route for creating an offer
router.post("/", createOffer);

// Route for getting offers by order ID
router.get("/order/:orderId", getOffersByOrder);

router.put("/:offerId/accept", acceptOffer);

router.put("/:offerId/reject", rejectOffer);

export default router;
