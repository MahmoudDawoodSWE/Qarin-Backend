import Offer from "../models/offer.js";

export const seedOffers = async (requests, stores) => {
  const offers = [
    {
      _id: "64f1a1c2e4b0f5a1d1c2a3be", // Fixed ID
      request: requests[0]._id,
      store: stores[0]._id,
      price: 1200,
      quantity: 10,
      wholeSalePrice: 1000,
      cost: 950,
      retailPrice: 1200.5,
      comment: "Limited stock, act fast!",
      flag: "special_offer",
    },
    {
      _id: "64f1a1c2e4b0f5a1d1c2a3bf", // Fixed ID
      request: requests[1]._id,
      store: stores[1]._id,
      price: 800,
      quantity: 5,
      wholeSalePrice: 700,
      cost: 650,
      retailPrice: 800.25,
      comment: "Best price for a quality sofa.",
      flag: "summer_sale",
    },
  ];

  const savedOffers = await Offer.insertMany(offers);
  console.log("Offers seeded:", savedOffers);
};
