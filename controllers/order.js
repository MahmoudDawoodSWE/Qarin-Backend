import Order from "../models/order.js";
import Offer from "../models/offer.js"; 

export const createOrder = async (req, res) => {
  try {
    const {
      offerId,
      requestId,
      userId,
      storeId,
      quantity,
      additionalNote,
      paymentMethod,
      deliveryMethod,
      expectedDeliveryDate,
    } = req.body;

    // Validate required fields
    if (
      !offerId ||
      !requestId ||
      !userId ||
      !storeId ||
      !quantity ||
      !paymentMethod ||
      !deliveryMethod
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate payment method
    const validPaymentMethods = ["Card", "Cash", "Online Transfer"];
    if (!validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({ error: "Invalid payment method" });
    }

    // Validate delivery method
    const validDeliveryMethods = ["Pickup", "Home Delivery"];
    if (!validDeliveryMethods.includes(deliveryMethod)) {
      return res.status(400).json({ error: "Invalid delivery method" });
    }

    // Validate quantity
    if (quantity <= 0) {
      return res
        .status(400)
        .json({ error: "Quantity must be greater than zero" });
    }

    // Fetch the offer price to calculate total price
    const offer = await Offer.findById(offerId);
    if (!offer) return res.status(404).json({ error: "Offer not found" });

    const totalPrice = quantity * parseFloat(offer.wholeSalePrice);

    // Create new order
    const newOrder = new Order({
      offerId,
      requestId,
      userId,
      storeId,
      quantity,
      totalPrice,
      additionalNote,
      paymentMethod,
      deliveryMethod,
      expectedDeliveryDate,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get Orders by User ID Function
export const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Find orders by userId and sort them by latest first
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get Orders by Store ID Function
export const getOrdersByStoreId = async (req, res) => {
  try {
    const { storeId } = req.params;

    if (!storeId) {
      return res.status(400).json({ error: "Store ID is required" });
    }

    // Find orders by storeId and sort them by latest first
    const orders = await Order.find({ storeId }).sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this store" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};