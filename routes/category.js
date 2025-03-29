import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getHighlightCategories,
} from "../controllers/category.js";

const router = express.Router();

// Route to get all categories
router.get("/", getAllCategories);

// Route to get highlight categories
router.get("/highlight", getHighlightCategories);

// Route to get a single category by ID
router.get("/:id", getCategoryById);

// Route to create a new category
router.post("/", createCategory);

// Route to update a category by ID
router.put("/:id", updateCategory);

// Route to delete a category by ID
router.delete("/:id", deleteCategory);

export default router;
