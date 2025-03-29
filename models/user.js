import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    // address: { type: String },
    // email: { type: String, required: true, unique: true },
    // picture: { type: String },
    // location: { type: String },
    // notification: { type: [String] },// " TODO " add date to the notification
    phoneNumber: { type: String, required: true },
    // views: { type: Number, default: 0 }, //" TODO " change array of ids od users who viewed the user
    // purchases_products: { type: String }, // " TODO " change array of ids of orders purchased by the user
    // status: {
    //   type: String,
    //   enum: ["active", "inactive", "suspended"],
    //   default: "inactive",
    // }, // inactive mean that the user didn't verify his email yet
    // blockedUsers: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
  }
  // { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
