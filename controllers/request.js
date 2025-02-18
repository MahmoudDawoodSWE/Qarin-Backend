import Request from "../models/request.js";
import User from "../models/user.js";
import Offer from "../models/offer.js";
import Product from "../models/product.js";

// Create a new request
export const createRequest = async (req, res) => {
  const { userId, productId, quantity, description } = req.body;

  // Validate required fields
  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Fetch the product to get the category ID
    const product = await Product.findById(productId).select("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create a new request with the category from the product
    const newRequest = new Request({
      user: userId, // Associate the user ID with the request
      product: productId, // Associate the product ID with the request
      category: product.category, // Add the category ID
      quantity,
      description: description || "", // Default to an empty string if not provided
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest); // Respond with the saved request
  } catch (error) {
    res.status(500).json({ message: "Failed to create request", error });
  }
};

export const getRequestsByCategory = async (req, res) => {
  const { categoryId } = req.query;
  try {
    let filter = {};

    // If categoryId is provided, filter by it
    if (categoryId) {
      filter.category = categoryId;
    }

    // Fetch requests based on the filter with limited fields
    const requests = await Request.find(filter)
      .populate({
        path: "user",
        select: "firstName lastName email phone picture", // Select only these fields
      })
      .populate({
        path: "product",
        select: "name images", // Select only these fields
      })
      .populate({
        path: "category",
        select: "name", // Select only these fields
      });

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error); // Log the full error to the console
    res.status(500).json({
      message: "Failed to fetch requests",
      error: error.message || "Unknown error occurred",
    });
  }
};

// Get orders by user ID with associated offers
export const getRequestsByUser = async (req, res) => {
  const { userId } = req.query;
  console.log(userId);
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    // Fetch the user's orders
    const userOrders = await Request.find({ user: userId })
      .populate({
        path: "product",
        select: "name images",
      })
      .populate({
        path: "category",
        select: "name",
      });

    // Fetch offers for each order
    const ordersWithOffers = await Promise.all(
      userOrders.map(async (order) => {
        // Find offers where the order ID is included in the `requests` array
        const offers = await Offer.find({ requests: { $in: [order._id] } });

        return {
          ...order.toObject(),
          offers, // Attach offers to the order
        };
      })
    );

    res.status(200).json(ordersWithOffers);
  } catch (error) {
    console.error("Error fetching user orders with offers:", error);
    res.status(500).json({
      message: "Failed to fetch user orders with offers",
      error: error.message || "Unknown error occurred",
    });
  }
};
