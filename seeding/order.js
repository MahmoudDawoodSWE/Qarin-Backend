import Order from "../models/order.js";

export const seedOrders = async (users, stores, offers) => {
  const orders = [
    {
      _id: "64f1a1c2e4b0f5a1d1c2a3c0", // Fixed ID
      user: users[0]._id,
      store: stores[0]._id,
      offer: offers[0]._id,
      quantity: 2, // Fixed quantity
      totalPrice: offers[0].price * 2, // Fixed price calculation
      status: "Pending", // Fixed status
    },
    {
      _id: "64f1a1c2e4b0f5a1d1c2a3c1", // Fixed ID
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

  const savedOrders = await Order.insertMany(orders);
  console.log("Fixed orders seeded:", savedOrders);
};
