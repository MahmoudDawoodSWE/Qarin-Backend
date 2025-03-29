import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.js";
import Store from "../models/store.js";
import Category from "../models/category.js";
import Request from "../models/request.js";
import Offer from "../models/offer.js";
import Order from "../models/order.js";
import Product from "../models/product.js";

import { seedCategories } from "./category.js";
import { seedUsers } from "./user.js";
import { seedStores } from "./store.js";
import { seedProducts } from "./product.js";
import { seedOffers } from "./offer.js";
import { seedRequests } from "./request.js";
import { seedOrders } from "./order.js";

dotenv.config(); // Load environment variables

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

// Main function to seed the database
const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("Clearing the database...");
    await Promise.all([
      User.deleteMany({}),
      Store.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      Request.deleteMany({}),
      Offer.deleteMany({}), // Clear offers as well
      Order.deleteMany({}), // Clear orders as well
    ]);
    console.log("Database cleared!");

    const categories = await seedCategories();
    const users = await seedUsers();
    const stores = await seedStores(categories);
    const products = await seedProducts(categories, stores);
    const requests = await seedRequests(users, products, categories);
    const offers = await seedOffers(requests, stores);

    // Seed orders after offers are seeded
    // await seedOrders(users, stores, offers);

    console.log("Seeding completed!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error during database seeding:", error.message);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
