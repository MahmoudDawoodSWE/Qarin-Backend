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

// export const getRequestsByCategory = async (req, res) => {
//   const { categoryId } = req.query;
//   try {
//     let filter = {};

//     // If categoryId is provided, filter by it
//     if (categoryId) {
//       filter.category = categoryId;
//     }

//     // Fetch requests based on the filter with limited fields
//     const requests = await Request.find(filter)
//       .populate({
//         path: "user",
//         select: "firstName lastName email phoneNumber picture", // Select only these fields
//       })
//       .populate({
//         path: "product",
//         select: "name images", // Select only these fields
//       })
//       .populate({
//         path: "category",
//         select: "name", // Select only these fields
//       });

//     res.status(200).json(requests);
//   } catch (error) {
//     console.error("Error fetching requests:", error); // Log the full error to the console
//     res.status(500).json({
//       message: "Failed to fetch requests",
//       error: error.message || "Unknown error occurred",
//     });
//   }
// };

export const getRequestsByCategory = async (req, res) => {
  // const { categoryIds } = req.body; // Expecting categoryIds as an array in the request body

  let { categoryIds } = req.query;

  categoryIds = categoryIds ? categoryIds.split(",") : [];

  try {
    let filter = {};

    // If categoryIds is provided and it's an array, filter by multiple categories
    if (Array.isArray(categoryIds) && categoryIds.length > 0) {
      filter.category = { $in: categoryIds }; // Use $in operator to filter multiple categories
    }

    // Fetch requests based on the filter with limited fields
    const requests = await Request.find(filter)
      .populate({
        path: "user",
        select: "firstName lastName email phoneNumber picture",
      })
      .populate({
        path: "product",
        select: "name images",
      })
      .populate({
        path: "category",
        select: "name",
      });

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({
      message: "Failed to fetch requests",
      error: error.message || "Unknown error occurred",
    });
  }
};

export const getRequestsByUser = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    // Fetch all requests made by the user
    const userRequests = await Request.find({ user: userId })
      .populate({ path: "product", select: "name images" }) // Fetch product details
      .lean();
    if (userRequests.length === 0) {
      return res.status(200).json([]); // Return empty list if no requests
    }
    // Get request IDs
    const requestIds = userRequests.map((req) => req._id);
    // Fetch offers related to these requests
    const offers = await Offer.find({ request: { $in: requestIds } })
      .populate({ path: "store", select: "storeName" })
      .lean();
    // Group offers by request ID
    const offersByRequest = offers.reduce((acc, offer) => {
      if (!acc[offer.request]) acc[offer.request] = [];
      acc[offer.request].push(offer);
      return acc;
    }, {});
    // Merge offers into requests
    const requestsWithOffers = userRequests.map((req) => ({
      ...req,
      offers: offersByRequest[req._id] || [], // Attach offers if available
    }));
    res.status(200).json(requestsWithOffers);
  } catch (error) {
    console.error("Error fetching user requests with offers:", error);
    res.status(500).json({
      message: "Failed to fetch user requests with offers",
      error: error.message || "Unknown error occurred",
    });
  }
};
