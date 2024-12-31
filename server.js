import express from "express";
import cors from "cors"; // Import CORS middleware
import dotenv from "dotenv";
import connectDB from "./db.js";
import categoryRoutes from "./routes/category.js";
import productRouter from "./routes/product.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  // console.log("Headers:", req.headers);
  // if (req.body && Object.keys(req.body).length) {
  //   console.log("Body:", req.body);
  // }
  console.log("------");
  next();
});

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Express backend with MongoDB!");
});

// Category routes
app.use("/categories", categoryRoutes);
app.use("/products", productRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
