import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategoryId, // Import the new function
} from "../controllers/product.js";

const router = express.Router();

// Create a product
router.post("/", createProduct);

// Get all products
router.get("/", getAllProducts);

// Search products
router.get("/search", searchProducts);

// Get products by category ID
router.get("/category/:categoryId", getProductsByCategoryId); // New route

// Get a product by ID
router.get("/:id", getProductById);

// Update a product
router.put("/:id", updateProduct);

// Delete a product
router.delete("/:id", deleteProduct);

export default router;
