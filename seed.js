import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";
import Store from "./models/store.js";
import Category from "./models/category.js";
import Product from "./models/product.js";
import Request from "./models/request.js";
import { faker } from "@faker-js/faker";

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

// Function to seed categories
const seedCategories = async () => {
  const categories = [];
  for (let i = 0; i < 5; i++) {
    categories.push({
      name: {
        en: faker.commerce.department(),
        ar: faker.commerce.department() + " بالعربية",
        he: faker.commerce.department() + " בעברית",
      },
      picture: faker.image.url(),
      level: faker.number.int({ min: 0, max: 1 }),
      advertisementSentence: {
        en: faker.company.catchPhrase(),
        ar: faker.company.catchPhrase() + " بالعربية",
        he: faker.company.catchPhrase() + " בעברית",
      },
    });
  }
  const savedCategories = await Category.insertMany(categories);
  console.log("Categories seeded:", savedCategories);
  return savedCategories;
};

// Function to seed users
const seedUsers = async () => {
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number("##########"),
      address: faker.location.streetAddress(),
      picture: faker.image.avatar(),
      location: faker.location.city(),
      notification: [],
      purchases_products: "",
    });
  }
  const savedUsers = await User.insertMany(users);
  console.log("Users seeded:", savedUsers);
  return savedUsers;
};

// Function to seed stores
const seedStores = async (categories) => {
  const stores = [];
  for (let i = 0; i < 5; i++) {
    stores.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number("##########"),
      address: faker.location.streetAddress(),
      cv: faker.internet.url(),
      subscription: {
        plan: "Premium",
        startDate: faker.date.recent(),
        endDate: faker.date.future(),
      },
      category: faker.helpers.arrayElement(categories)._id,
      rating: faker.number.int({ min: 1, max: 5 }),
    });
  }
  const savedStores = await Store.insertMany(stores);
  console.log("Stores seeded:", savedStores);
  return savedStores;
};

// Function to seed products
const seedProducts = async (categories, stores) => {
  const products = [];
  for (let i = 0; i < 10; i++) {
    products.push({
      productId: faker.database.mongodbObjectId(),
      name: {
        en: faker.commerce.productName(),
        ar: faker.commerce.productName() + " بالعربية",
        he: faker.commerce.productName() + " בעברית",
      },
      GTINs: [
        faker.number
          .bigInt({ min: 1000000000000, max: 9999999999999 })
          .toString(),
        faker.number
          .bigInt({ min: 1000000000000, max: 9999999999999 })
          .toString(),
      ],
      images: [faker.image.url(), faker.image.url()],
      description: {
        en: faker.commerce.productDescription(),
        ar: faker.commerce.productDescription() + " بالعربية",
        he: faker.commerce.productDescription() + " בעברית",
      },
      attributes: {
        color: faker.color.human(),
        material: faker.commerce.productMaterial(),
        weight: `${faker.number.float({ min: 0.5, max: 5, precision: 0.1 })}kg`,
      },
      category: faker.helpers.arrayElement(categories)._id,
      store: faker.helpers.arrayElement(stores)._id, // Associate product with a store
    });
  }
  const savedProducts = await Product.insertMany(products);
  console.log("Products seeded:", savedProducts);
  return savedProducts;
};

// Function to seed requests
const seedRequests = async (users, products, categories) => {
  const requests = [];

  for (let i = 0; i < 20; i++) {
    requests.push({
      user: faker.helpers.arrayElement(users)._id, // Associate a random user
      product: faker.helpers.arrayElement(products)._id, // Associate a random product
      category: faker.helpers.arrayElement(categories)._id, // Associate a random category
      description: faker.commerce.productDescription(),
      picture: faker.image.url(), // Random image URL
      barcode: faker.number
        .bigInt({ min: 1000000000000, max: 9999999999999 })
        .toString(),
      link: faker.internet.url(), // Random URL
      likes: new Map(
        users.map((user) => [user._id.toString(), faker.datatype.boolean()])
      ),
      quantity: faker.number.int({ min: 1, max: 10 }),
    });
  }

  const savedRequests = await Request.insertMany(requests);
  console.log("Requests seeded:", savedRequests);
};

// Main function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Clear the database
    console.log("Clearing the database...");
    await Promise.all([
      User.deleteMany({}),
      Store.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      Request.deleteMany({}),
    ]);
    console.log("Database cleared!");

    // Seed users, categories, and products
    const categories = await seedCategories();
    const users = await seedUsers();
    const stores = await seedStores(categories);
    const products = await seedProducts(categories, stores);

    // Seed requests
    await seedRequests(users, products, categories);

    console.log("Seeding completed!");
    mongoose.connection.close(); // Close connection after seeding
  } catch (error) {
    console.error("Error during database seeding:", error.message);
    mongoose.connection.close(); // Ensure connection is closed in case of error
    process.exit(1);
  }
};

// Run the seeding process
seedDatabase();
