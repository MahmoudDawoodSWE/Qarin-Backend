import Store from "../models/store.js";

export const seedStores = async (categories) => {
  const stores = [
    {
      _id: "64f1a1c2e4b0f5a1d1c2a3b8", // Fixed ID
      storeName: "Development Store",
      firstName: "dev",
      lastName: "team",
      email: "dev@qarin.com",
      phoneNumber: "1122334455",
      address: "789 Oak St, City",
      category: categories[0]._id,
    },
    {
      _id: "64f1a1c2e4b0f5a1d1c2a3b9", // Fixed ID
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
