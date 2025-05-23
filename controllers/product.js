import Product from "../models/product.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { productId, GTINs, images, description, attributes, category } =
      req.body;

    const newProduct = new Product({
      productId,
      GTINs,
      images,
      description,
      attributes,
      category,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve products", error: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve product", error: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("category");

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { query, lang, image, url, qrCode } = req.query;
console.log(
      "Search parameters received:",
      { query, lang, image, url, qrCode }
    );
    // Validate at least one search parameter
    if (!query && !image && !url && !qrCode) {
      return res
        .status(400)
        .json({ message: "At least one search parameter is required" });
    }

    // Build search condition
    let searchCondition = {};

    if (query) {
      if (lang) {
        // Search in a specific language
        searchCondition.$or = [
          { [`name.${lang}`]: { $regex: query, $options: "i" } },
          { [`description.${lang}`]: { $regex: query, $options: "i" } },
        ];
      } else {
        // Search across all languages
        searchCondition.$or = [
          { "name.en": { $regex: query, $options: "i" } },
          { "name.ar": { $regex: query, $options: "i" } },
          { "name.he": { $regex: query, $options: "i" } },
          { "description.en": { $regex: query, $options: "i" } },
          { "description.ar": { $regex: query, $options: "i" } },
          { "description.he": { $regex: query, $options: "i" } },
        ];
      }
    }

    if (image) {
      // Search by image (assuming image is stored as a URL or identifier)
      searchCondition.image = image;
    }

    if (url) {
      // Search by URL
      searchCondition.url = url;
    }

    if (qrCode) {
      // Search by QR code
      searchCondition.qrCode = qrCode;
    }

    const products = await Product.find(searchCondition).populate("category");
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to search products", error: error.message });
  }
};

// Get products by category ID
export const getProductsByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId }).populate(
      "category"
    );

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this category." });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve products by category",
      error: error.message,
    });
  }
};
