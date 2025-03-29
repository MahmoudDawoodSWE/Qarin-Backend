import Offer from "../models/offer.js";

export const createOffer = async (req, res) => {
  try {
    // const {
    //   dateTimer,
    //   userId,
    //   // wholeSalePrice,
    //   cost,
    //   // retailPrice,
    //   comment = "", // Default to an empty string if not provided
    //   flag = null, // Default value if not provided
    //   quantity,
    //   refurbished = "No", // Default to "No" if not provided
    //   display = null, // Default value if not provided
    //   clearance = "No", // Default to "No" if not provided
    //   orderId,
    // } = req.body;

    const { storeId, requestId, cost, quantity } = req.body;

    // Validate required fields
    // if (
    //   !userId ||
    //   !wholeSalePrice ||
    //   !cost ||
    //   !retailPrice ||
    //   !quantity ||
    //   !orderId
    // ) {
    //   return res.status(400).json({ message: "Missing required fields." });
    // }
    if (!storeId || !requestId || !cost || !quantity)
      return res.status(400).json({ message: "Missing required fields." });

    // Create a new offer with orderId as the first element in requests
    // const newOffer = new Offer({
    //   dateTimer,
    //   storeId: userId,
    //   wholeSalePrice,
    //   cost,
    //   retailPrice,
    //   comment,
    //   flag,
    //   quantity,
    //   refurbished,
    //   display,
    //   clearance,
    //   requests: [orderId],
    // });
    const newOffer = new Offer({
      store: storeId,
      request: requestId,
      cost,
      quantity,
    });

    // Save the offer to the database
    const savedOffer = await newOffer.save();

    res.status(201).json({
      message: "Offer created successfully",
      offer: savedOffer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create the offer",
      error: error.message,
    });
  }
};

export const getOffersByOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Validate orderId
    if (!orderId) {
      return res.status(400).json({ message: "Missing order ID." });
    }

    // Find offers associated with the given order ID
    const offers = await Offer.find({ requests: orderId });

    if (!offers || offers.length === 0) {
      return res
        .status(404)
        .json({ message: "No offers found for this order." });
    }

    res.status(200).json({
      message: "Offers retrieved successfully.",
      offers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve offers.",
      error: error.message,
    });
  }
};

export const acceptOffer = async (req, res) => {
  try {
    const { offerId } = req.params;

    // Validate offerId
    if (!offerId) {
      return res.status(400).json({ message: "Missing offer ID." });
    }

    // Find the offer by ID
    const offer = await Offer.findById(offerId);

    if (!offer) {
      return res.status(404).json({ message: "Offer not found." });
    }

    // Update the offer status to "accepted"
    offer.status = "accepted";

    // Save the updated offer
    await offer.save();

    res.status(200).json({
      message: "Offer accepted successfully.",
      offer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to accept the offer.",
      error: error.message,
    });
  }
};

export const rejectOffer = async (req, res) => {
  try {
    const { offerId } = req.params;

    // Validate offerId
    if (!offerId) {
      return res.status(400).json({ message: "Missing offer ID." });
    }

    // Find the offer by ID
    const offer = await Offer.findById(offerId);

    if (!offer) {
      return res.status(404).json({ message: "Offer not found." });
    }

    // Update the offer status to "rejected"
    offer.status = "rejected";

    // Save the updated offer
    await offer.save();

    res.status(200).json({
      message: "Offer rejected successfully.",
      offer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to reject the offer.",
      error: error.message,
    });
  }
};
