import mongoose from "mongoose";
import translationSchema from "./translation.js";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: translationSchema, // Reusable translation schema
      required: true,
    },
    GTINs: {
      type: [String], // Array of strings for GTINs
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    description: {
      type: translationSchema, // Reusable translation schema
      required: true,
    },
    attributes: {
      type: Map, // Flexible structure for key-value pairs
      of: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to Category model
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Product = mongoose.model("Product", productSchema);

export default Product;
