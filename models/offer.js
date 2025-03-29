import mongoose from "mongoose";

const offersSchema = new mongoose.Schema(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    // wholeSalePrice: { type: Number, required: true },
    cost: { type: Number, required: true },
    // retailPrice: { type: mongoose.Schema.Types.Decimal128, required: true },
    comment: { type: String },
    flag: { type: String },
    quantity: { type: Number, required: true }, // Amount/quantity available
    refurbished: { type: Boolean, default: false },
    clearance: { type: Boolean, default: false },
    request: { type: mongoose.Schema.Types.ObjectId, ref: "Requests" },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  }
  // { timestamps: true }
);

const Offer = mongoose.model("Offer", offersSchema);

export default Offer;
