import mongoose from "mongoose";

const offersSchema = new mongoose.Schema(
  {
    dateTimer: { type: Number }, // Date/time represented as an integer (e.g., timestamp)
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    }, // Pointer to Store model
    wholeSalePrice: { type: Number, required: true },
    cost: { type: Number, required: true }, // Cost price of the offer
    retailPrice: { type: mongoose.Schema.Types.Decimal128, required: true }, // Retail price (decimal value)
    comment: { type: String }, // Optional comment or note
    flag: { type: String }, // Flag (e.g., "rippon")
    quantity: { type: Number, required: true }, // Amount/quantity available
    refurbished: { type: String, enum: ["Yes", "No"], default: "No" }, // Whether the item is refurbished
    display: { type: String }, // Information about the display
    clearance: { type: String, enum: ["Yes", "No"], default: "No" }, // Whether the item is on clearance
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Requests" }],
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt

const Offer = mongoose.model("Offer", offersSchema);

export default Offer;
