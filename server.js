import express from "express";
import cors from "cors"; // Import CORS middleware
import dotenv from "dotenv";
import connectDB from "./db.js";
import categoryRoutes from "./routes/category.js";
import productRouter from "./routes/product.js";
import requestRouter from "./routes/request.js";
import offerRouter from "./routes/offer.js";
import orderRouter from "./routes/order.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();


// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Body:", req.body);
  console.log("------");
  next();
});
// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Express backend with MongoDB!");
});

// Category routes
app.use("/categories", categoryRoutes);
app.use("/products", productRouter);
app.use("/requests", requestRouter);
app.use("/offers", offerRouter);
app.use("/orders", orderRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
