import mongoose from "mongoose";
import User from "./user.js";

const storeSchema = new mongoose.Schema({
  rating: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rate: { type: Number, required: true, min: 1, max: 5 },
    },
  ],
  // subscription: {
  //   type: {
  //     plan: { type: String, required: true }, // Subscription plan name
  //     startDate: { type: Date, required: true }, // Start date of subscription
  //     endDate: { type: Date }, // End date of subscription
  //   },
  //   required: true,
  // },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
});

const Store = User.discriminator("Store", storeSchema);

export default Store;
