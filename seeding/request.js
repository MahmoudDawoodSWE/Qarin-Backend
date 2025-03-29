import Request from "../models/request.js";

export const seedRequests = async (users, products, categories) => {
  const requests = [
    {
      _id: "64f1a1c2e4b0f5a1d1c2a3bc", // Fixed ID
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
      _id: "64f1a1c2e4b0f5a1d1c2a3bd", // Fixed ID
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
