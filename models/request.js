import mongoose from "mongoose";

const requestsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Pointer to User
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    }, // Pointer to Category
    description: { type: String, required: true }, // String for description
    picture: { type: String, required: true }, // URL of the picture
    offers: { type: mongoose.Schema.Types.ObjectId, ref: "Offer" }, // Pointer to Offers
    barcode: { type: String }, // Barcode (GTINs) as string
    link: { type: String }, // URL or Link
    likes: { type: Map, of: Boolean }, // Map for likes (e.g., userId -> liked status)
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Pointer to Product
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestsSchema);

export default Request;
