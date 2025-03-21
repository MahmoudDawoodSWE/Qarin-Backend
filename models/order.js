import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    offer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
      required: true,
    }, // Reference to Offer

    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requests",
      required: true,
    }, // Reference to Request

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to User

    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    }, // Reference to Store

    quantity: {
      type: Number,
      required: true,
      min: 1, // Ensuring at least 1 item is ordered
    },

    totalPrice: {
      type: mongoose.Schema.Types.Decimal128,
    //   required: true,
    }, // Total price (computed from quantity & offer price)

    additionalNote: {
      type: String,
      maxlength: 500, // Optional note from the user
    },

    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Cancelled"],
      default: "Pending",
    }, // Order status

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    }, // Payment status tracking

    paymentMethod: {
      type: String,
      enum: ["Card", "Cash", "Online Transfer"],
      default: "Cash",
    }, // Payment method

    deliveryMethod: {
      type: String,
      enum: ["Pickup", "Home Delivery"],
      required: true,
    }, // Delivery preference

    expectedDeliveryDate: {
      type: Date,
    }, // Estimated delivery date

    orderDate: {
      type: Date,
      default: Date.now,
    }, // Timestamp of order placement

    updatedAt: {
      type: Date,
      default: Date.now,
    }, // Automatically updates on status change
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
