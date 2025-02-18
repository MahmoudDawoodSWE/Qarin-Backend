import express from "express";
import {
  createOrder,
  getOrdersByUserId,
  getOrdersByStoreId,
} from "../controllers/order.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/:userId", getOrdersByUserId);

router.get("/store/:storeId", getOrdersByStoreId);

export default router;
