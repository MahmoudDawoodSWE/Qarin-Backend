import mongoose from "mongoose";

const requestsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Pointer to User
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    // description: { type: String, required: true },
    // picture: { type: String }, // URL of the picture
    // barcode: { type: String }, // Barcode (GTINs) as string
    // link: { type: String }, // URL or Link
    quantity: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

const Request = mongoose.model("Requests", requestsSchema);

export default Request;
