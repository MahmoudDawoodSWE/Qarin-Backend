import User from "../models/user.js";

export const seedUsers = async () => {
  const users = [
    {
      _id: "64f1a1c2e4b0f5a1d1c2a3b6", // Fixed ID
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
      _id: "64f1a1c2e4b0f5a1d1c2a3b7", // Fixed ID
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
