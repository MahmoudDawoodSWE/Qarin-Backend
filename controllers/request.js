import Request from "../models/request.js";
import User from "../models/user.js";

// Create a new order
export const createRequest = async (req, res) => {
  const { userId, productId, quantity, description } = req.body;
  console.log(userId, productId, quantity, description);
  // Validate required fields
  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Create a new order
    const newOrder = new Request({
      user: userId, // Associate the user ID with the order
      product: productId, // Associate the product ID with the order
      quantity,
      description: description || "", // Default to an empty string if not provided
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder); // Respond with the saved order
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
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


