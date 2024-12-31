import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    lastName: { type: String, required: true }, // Last name of the user
    firstName: { type: String, required: true }, // First name of the user
    address: { type: String }, // Address of the user
    email: { type: String, required: true, unique: true }, // Email (unique)
    picture: { type: String }, // Profile picture (URL)
    location: { type: String }, // Location information
    notification: { type: [String] }, // Array of notification messages
    phone: { type: String, required: true }, // Phone number
    views: { type: Number, default: 0 }, // Number of profile views
    purchases_products: { type: String }, // Related purchases or products
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    }, // User status
    blockedUsers: { type: [mongoose.Schema.Types.ObjectId], ref: "User" }, // Array of blocked users (reference to User model)
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

const User = mongoose.model("User", userSchema);

export default User;
