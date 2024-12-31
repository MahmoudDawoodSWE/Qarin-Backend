import mongoose from "mongoose";
import translationSchema from "./translation.js";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: translationSchema, // Translatable field for category name
      required: true,
    },
    picture: {
      type: String,
      required: true,
    }, // URL for the category picture
    level: {
      type: Number,
      default: 0,
    }, // Level of the category (e.g., main or subcategory level)
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    }, // Pointer to parent category (self-referential)
    subcategory: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
    }, // Pointers to subcategories
    advertisementSentence: {
      type: translationSchema, // Translatable advertisement sentence
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
