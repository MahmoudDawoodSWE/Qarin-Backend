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
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Latest gadgets available!",
        ar: "أحدث الأدوات المتاحة!",
        he: "הגאדג'טים האחרונים זמינים!",
      },
    },
    {
      name: { en: "Furniture", ar: "أثاث", he: "רהיטים" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Comfort and style!",
        ar: "راحة وأناقة!",
        he: "נוחות וסטייל!",
      },
    },
    {
      name: { en: "Clothing", ar: "ملابس", he: "בגדים" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Trendy fashion!",
        ar: "موضة عصرية!",
        he: "אופנה אופנתית!",
      },
    },
    {
      name: { en: "Books", ar: "كتب", he: "ספרים" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Explore new worlds through reading!",
        ar: "استكشف عوالم جديدة من خلال القراءة!",
        he: "גלה עולמות חדשים דרך קריאה!",
      },
    },
    {
      name: { en: "Toys", ar: "ألعاب", he: "צעצועים" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Fun and excitement for all ages!",
        ar: "متعة وإثارة لجميع الأعمار!",
        he: "כיף והתרגשות לכל גיל!",
      },
    },
    {
      name: { en: "Sports", ar: "رياضة", he: "ספורט" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Gear up for your next adventure!",
        ar: "استعد لمغامرتك القادمة!",
        he: "היכון להרפתקה הבאה שלך!",
      },
    },
    {
      name: { en: "Beauty", ar: "جمال", he: "יופי" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Enhance your natural beauty!",
        ar: "تعزيز جمالك الطبيعي!",
        he: "שפרי את היופי הטבעי שלך!",
      },
    },
    {
      name: { en: "Food & Drink", ar: "طعام وشراب", he: "אוכל ושתייה" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Delicious treats await!",
        ar: "مأكولات لذيذة في انتظارك!",
        he: "תענוגות טעימים מחכים לך!",
      },
    },
    {
      name: { en: "Health", ar: "صحة", he: "בריאות" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Stay fit and healthy!",
        ar: "ابقَ لائقًا وصحيًا!",
        he: "שמור על כושר ובריאות!",
      },
    },
    {
      name: { en: "Automotive", ar: "سيارات", he: "רכב" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Drive with confidence!",
        ar: "قد بثقة!",
        he: "נהג בביטחון!",
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
      phoneNumber: "1234567890",
      address: "123 Main St, City",
      location: "New York",
      notification: [],
      purchases_products: "",
    },
    {
      firstName: "Sara",
      lastName: "Smith",
      email: "sarasmith@example.com",
      phoneNumber: "9876543210",
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
      storeName: "Development Store",
      firstName: "dev",
      lastName: "team",
      email: "dev@qarin.com",
      phoneNumber: "1122334455",
      address: "789 Oak St, City",
      category: categories[0]._id,
    },
    {
      storeName: "Bluelock",
      firstName: "Michael",
      lastName: "Brown",
      email: "michael@example.com",
      phoneNumber: "1122334455",
      address: "789 Oak St, City",
      category: categories[0]._id,
    },
    {
      storeName: "Redlock",
      firstName: "Emma",
      lastName: "Wilson",
      email: "emma@example.com",
      phoneNumber: "5566778899",
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
      productId: "P123456",
      name: {
        en: "Laptop",
        ar: "كمبيوتر محمول",
        he: "מחשב נייד",
      },
      GTINs: ["1234567890123"],
      images: ["https://example.com/laptop.jpg"],
      category: categories[0]._id, // Electronics category
      store: stores[0]._id, // Michael's store
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
        { name: { en: "Silver", ar: "فضي", he: "כסף" }, color: "#C0C0C0" },
        { name: { en: "Black", ar: "أسود", he: "שחור" }, color: "#000000" },
      ],
      sizes: ["13-inch", "15-inch", "17-inch"],
    },
    {
      productId: "P789012",
      name: {
        en: "Sofa",
        ar: "أريكة",
        he: "ספה",
      },
      GTINs: ["9876543210987"],
      images: ["https://example.com/sofa.jpg"],
      category: categories[1]._id, // Furniture category
      store: stores[1]._id, // Emma's store
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
        { name: { en: "Blue", ar: "أزرق", he: "כחול" }, color: "#0000FF" },
        { name: { en: "Gray", ar: "رمادي", he: "אפור" }, color: "#808080" },
      ],
      sizes: ["2-seater", "3-seater", "L-shaped"],
    },
    {
      productId: "AWSE2024",
      name: {
        en: "Apple Watch SE 2024",
        ar: "ساعة آبل SE 2024",
        he: "שעון אפל SE 2024",
      },
      GTINs: ["1234567890123"],
      images: [
        "https://www.ivory.co.il/files/catalog/org/1726824524i24XB.webp",
        "https://www.ivory.co.il/files/catalog/org/1726824524g24Oe.webp",
        "https://www.ivory.co.il/files/catalog/org/1726824524g24Hk.webp",
        "https://www.ivory.co.il/files/catalog/org/1726824524o24KK.webp",
      ],
      category: categories[0]._id, // Electronics category
      store: stores[0]._id, // Michael's store
      description: {
        en: "The Apple Watch SE 2024 gives you the essential Apple Watch features at an affordable price. Track your daily activity, monitor your health, stay connected, and use Apple Pay.",
        ar: "توفر لك ساعة آبل SE 2024 الميزات الأساسية لساعة آبل بسعر مناسب. تابع نشاطك اليومي، راقب صحتك، ابقَ متصلاً، واستخدم Apple Pay.",
        he: "השעון אפל SE 2024 מציע לך את התכונות הבסיסיות של שעון אפל במחיר נגיש. עקוב אחרי הפעילות היומית שלך, נטר את הבריאות שלך, הישאר מחובר והשתמש ב-Apple Pay.",
      },
      attributes: {
        display: "Retina LTPO OLED",
        processor: "S9 SiP",
        waterResistance: "50 meters",
        batteryLife: "Up to 18 hours",
        connectivity: "GPS, Bluetooth 5.3, Wi-Fi",
        healthFeatures: "Heart rate, Sleep tracking, Fall detection",
      },
      colors: [
        { name: { en: "Silver", ar: "فضي", he: "כסף" }, color: "#E2E2E2" },
        {
          name: { en: "Midnight", ar: "منتصف الليل", he: "חצות" },
          color: "#1A1B1F",
        },
        {
          name: { en: "Starlight", ar: "ضوء النجوم", he: "אור כוכבים" },
          color: "#E3C6AA",
        },
      ],
      sizes: ["40mm", "44mm"],
    },
  ];

  // Insert the products into the database
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
      category: categories[0]._id,
    },
    {
      user: users[1]._id,
      product: products[1]._id,
      description: "Need a stylish and comfortable sofa for my living room.",
      picture: "https://example.com/sofa-request.jpg",
      barcode: "9876543210987",
      link: "https://example.com/sofa-details",
      quantity: 2,
      category: categories[1]._id,
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
