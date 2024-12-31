import mongoose from "mongoose";
import User from "./user.js";

const storeSchema = new mongoose.Schema({
  cv: { type: String, required: true }, // CV as a string (could be a file URL)
  rating: { type: Number, min: 1, max: 5 }, 
  subscription: {
    type: {
      plan: { type: String, required: true }, // Subscription plan name
      startDate: { type: Date, required: true }, // Start date of subscription
      endDate: { type: Date }, // End date of subscription
    },
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  }, // Pointer to Category
});

// Create the Store model as a discriminator of User
const Store = User.discriminator("Store", storeSchema);

export default Store;
