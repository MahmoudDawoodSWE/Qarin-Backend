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
      type: translationSchema,
      required: true,
    },
    GTINs: {
      type: [String],
      // required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    description: {
      type: translationSchema,
      // required: true,
    },
    attributes: {
      type: Map,
      of: String,
      // required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    colors: [
      {
        name: { type: translationSchema, required: true },
        color: {
          type: String,
          required: true
        },
      },
    ],
    sizes: {
      type: [String],
      // required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
