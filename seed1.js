import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";
import Store from "./models/store.js";
import Category from "./models/category.js";
import Product from "./models/product.js";
import Request from "./models/request.js";
import Offer from "./models/offer.js";
import Order from "./models/order.js";
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
  const categories = [
    {
      name: { en: "Electronics", ar: "إلكترونيات", he: "אלקטרוניקה" },
      picture: "https://example.com/electronics.jpg", // Add a picture URL
      level: 1,
      advertisementSentence: {
        en: "Latest gadgets available!",
        ar: "أحدث الأدوات المتاحة!",
        he: "הגאדג'טים האחרונים זמינים!",
      },
    },
    {
      name: { en: "Furniture", ar: "أثاث", he: "רהיטים" },
      picture: "https://example.com/furniture.jpg", // Add a picture URL
      level: 1,
      advertisementSentence: {
        en: "Comfort and style!",
        ar: "راحة وأناقة!",
        he: "נוחות וסטייל!",
      },
    },
    {
      name: { en: "Clothing", ar: "ملابس", he: "בגדים" },
      picture: "https://example.com/clothing.jpg", // Add a picture URL
      level: 1,
      advertisementSentence: {
        en: "Trendy fashion!",
        ar: "موضة عصرية!",
        he: "אופנה אופנתית!",
      },
    },
  ];
  const savedCategories = await Category.insertMany(categories);
  console.log("Categories seeded:", savedCategories);
  return savedCategories;
};

// Function to seed users
const seedUsers = async () => {
  const users = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
      address: "123 Main St, City",
      location: "New York",
      notification: [],
      purchases_products: "",
    },
    {
      firstName: "Sara",
      lastName: "Smith",
      email: "sarasmith@example.com",
      phone: "9876543210",
      address: "456 Elm St, City",
      location: "Los Angeles",
      notification: [],
      purchases_products: "",
    },
  ];
  const savedUsers = await User.insertMany(users);
  console.log("Users seeded:", savedUsers);
  return savedUsers;
};

// Function to seed stores
const seedStores = async (categories) => {
  const stores = [
    {
      firstName: "Michael",
      lastName: "Brown",
      email: "michael@example.com",
      phone: "1122334455",
      address: "789 Oak St, City",
      category: categories[0]._id,
    },
    {
      firstName: "Emma",
      lastName: "Wilson",
      email: "emma@example.com",
      phone: "5566778899",
      address: "321 Pine St, City",
      category: categories[1]._id,
    },
  ];
  const savedStores = await Store.insertMany(stores);
  console.log("Stores seeded:", savedStores);
  return savedStores;
};
// Function to seed products
const seedProducts = async (categories, stores) => {
  const products = [
    {
      productId: "P123456", // Unique product ID
      name: { en: "Laptop", ar: "كمبيوتر محمول", he: "מחשב נייד" },
      GTINs: ["1234567890123"], // Example GTIN
      images: ["https://example.com/laptop.jpg"], // Example image URL
      category: categories[0]._id,
      store: stores[0]._id,
      description: {
        en: "High-performance laptop.",
        ar: "كمبيوتر محمول عالي الأداء.",
        he: "מחשב נייד בעל ביצועים גבוהים.",
      },
      attributes: {
        brand: "BrandX",
        screenSize: "15 inches",
        RAM: "16GB",
      },
      colors: [
        { name: "Silver", color: "#C0C0C0" },
        { name: "Black", color: "#000000" },
      ],
      sizes: ["13-inch", "15-inch", "17-inch"],
    },
    {
      productId: "P789012", // Unique product ID
      name: { en: "Sofa", ar: "أريكة", he: "ספה" },
      GTINs: ["9876543210987"], // Example GTIN
      images: ["https://example.com/sofa.jpg"], // Example image URL
      category: categories[1]._id,
      store: stores[1]._id,
      description: {
        en: "Comfortable and stylish sofa.",
        ar: "أريكة مريحة وأنيقة.",
        he: "ספה נוחה ואלגנטית.",
      },
      attributes: {
        brand: "FurnitureCo",
        material: "Velvet",
        dimensions: "200x90x85 cm",
      },
      colors: [
        { name: "Blue", color: "#0000FF" },
        { name: "Gray", color: "#808080" },
      ],
      sizes: ["2-seater", "3-seater", "L-shaped"],
    },
  ];

  const savedProducts = await Product.insertMany(products);
  console.log("Products seeded:", savedProducts);
  return savedProducts;
};


// Function to seed offers
const seedOffers = async (requests, stores) => {
  const offers = [
    {
      request: requests[0]._id,
      store: stores[0]._id,
      price: 1200,
      status: "Pending",
      quantity: 10, // Example quantity
      wholeSalePrice: 1000, // Example wholesale price
      cost: 950, // Example cost
      retailPrice: 1200.5, // Example retail price
      comment: "Limited stock, act fast!",
      flag: "special_offer",
    },
    {
      request: requests[1]._id,
      store: stores[1]._id,
      price: 800,
      status: "Accepted",
      quantity: 5, // Example quantity
      wholeSalePrice: 700, // Example wholesale price
      cost: 650, // Example cost
      retailPrice: 800.25, // Example retail price
      comment: "Best price for a quality sofa.",
      flag: "summer_sale",
    },
  ];

  const savedOffers = await Offer.insertMany(offers);
  console.log("Offers seeded:", savedOffers);
};

// Function to seed requests
const seedRequests = async (users, products, categories) => {
  const requests = [
    {
      user: users[0]._id,
      product: products[0]._id,
      description: "Looking for a powerful laptop for gaming and work.",
      picture: "https://example.com/laptop-request.jpg",
      barcode: "1234567890123",
      link: "https://example.com/laptop-details",
      quantity: 1,
    },
    {
      user: users[1]._id,
      product: products[1]._id,
      description: "Need a stylish and comfortable sofa for my living room.",
      picture: "https://example.com/sofa-request.jpg",
      barcode: "9876543210987",
      link: "https://example.com/sofa-details",
      quantity: 2,
    },
  ];

  const savedRequests = await Request.insertMany(requests);
  console.log("Requests seeded:", savedRequests);
  return savedRequests;
};

// Function to seed orders with fixed data
const seedOrders = async (users, stores, offers) => {
  // Define fixed orders
  const orders = [
    {
      user: users[0]._id,
      store: stores[0]._id,
      offer: offers[0]._id,
      quantity: 2, // Fixed quantity
      totalPrice: offers[0].price * 2, // Fixed price calculation
      status: "Pending", // Fixed status
    },
    {
      user: users[1]._id,
      store: stores[1]._id,
      offer: offers[1]._id,
      quantity: 1, // Fixed quantity
      totalPrice: offers[1].price * 1, // Fixed price calculation
      status: "Accepted", // Fixed status
    },
    {
      user: users[0]._id,
      store: stores[1]._id,
      offer: offers[0]._id,
      quantity: 3, // Fixed quantity
      totalPrice: offers[0].price * 3, // Fixed price calculation
      status: "Shipped", // Fixed status
    },
    {
      user: users[1]._id,
      store: stores[0]._id,
      offer: offers[1]._id,
      quantity: 4, // Fixed quantity
      totalPrice: offers[1].price * 4, // Fixed price calculation
      status: "Delivered", // Fixed status
    },
  ];

  // Insert the fixed orders into the database
  const savedOrders = await Order.insertMany(orders);
  console.log("Fixed orders seeded:", savedOrders);
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
