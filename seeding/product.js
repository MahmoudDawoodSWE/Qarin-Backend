import Product from "../models/product.js";

export const seedProducts = async (categories, stores) => {
  const products = [
    {
      _id: "64f1a1c2e4b0f5a1d1c2a3ba", // Fixed ID
      productId: "P123456",
      name: {
        en: "Laptop",
        ar: "كمبيوتر محمول",
        he: "מחשב נייד",
      },
      GTINs: ["1234567890123"],
      images: ["https://example.com/laptop.jpg"],
      category: categories[0]._id, // Electronics category
      store: stores[0]._id, // Michael's store
      description: {
        en: "High-performance laptop.",
        ar: "كمبيوتر محمول عالي الأداء.",
        he: "מחשב נייד בעל ביצועים גבוהים.",
      },
      attributes: {
        brand: "BrandX",
        screenSize: "15 inches",
        RAM: "16GB",
      },
      colors: [
        { name: { en: "Silver", ar: "فضي", he: "כסף" }, color: "#C0C0C0" },
        { name: { en: "Black", ar: "أسود", he: "שחור" }, color: "#000000" },
      ],
      sizes: ["13-inch", "15-inch", "17-inch"],
    },
    {
      _id: "64f1a1c2e4b0f5a1d1c2a3bb", // Fixed ID
      productId: "P789012",
      name: {
        en: "Sofa",
        ar: "أريكة",
        he: "ספה",
      },
      GTINs: ["9876543210987"],
      images: ["https://example.com/sofa.jpg"],
      category: categories[1]._id, // Furniture category
      store: stores[1]._id, // Emma's store
      description: {
        en: "Comfortable and stylish sofa.",
        ar: "أريكة مريحة وأنيقة.",
        he: "ספה נוחה ואלגנטית.",
      },
      attributes: {
        brand: "FurnitureCo",
        material: "Velvet",
        dimensions: "200x90x85 cm",
      },
      colors: [
        { name: { en: "Blue", ar: "أزرق", he: "כחול" }, color: "#0000FF" },
        { name: { en: "Gray", ar: "رمادي", he: "אפור" }, color: "#808080" },
      ],
      sizes: ["2-seater", "3-seater", "L-shaped"],
    },
    {
      productId: "AWSE2024",
      name: {
        en: "Apple Watch SE 2024",
        ar: "ساعة آبل SE 2024",
        he: "שעון אפל SE 2024",
      },
      GTINs: ["1234567890123"],
      images: [
        "https://www.ivory.co.il/files/catalog/org/1726824524i24XB.webp",
        "https://www.ivory.co.il/files/catalog/org/1726824524g24Oe.webp",
        "https://www.ivory.co.il/files/catalog/org/1726824524g24Hk.webp",
        "https://www.ivory.co.il/files/catalog/org/1726824524o24KK.webp",
      ],
      category: categories[0]._id, // Electronics category
      store: stores[0]._id, // Michael's store
      description: {
        en: "The Apple Watch SE 2024 gives you the essential Apple Watch features at an affordable price. Track your daily activity, monitor your health, stay connected, and use Apple Pay.",
        ar: "توفر لك ساعة آبل SE 2024 الميزات الأساسية لساعة آبل بسعر مناسب. تابع نشاطك اليومي، راقب صحتك، ابقَ متصلاً، واستخدم Apple Pay.",
        he: "השעון אפל SE 2024 מציע לך את התכונות הבסיסיות של שעון אפל במחיר נגיש. עקוב אחרי הפעילות היומית שלך, נטר את הבריאות שלך, הישאר מחובר והשתמש ב-Apple Pay.",
      },
      attributes: {
        display: "Retina LTPO OLED",
        processor: "S9 SiP",
        waterResistance: "50 meters",
        batteryLife: "Up to 18 hours",
        connectivity: "GPS, Bluetooth 5.3, Wi-Fi",
        healthFeatures: "Heart rate, Sleep tracking, Fall detection",
      },
      colors: [
        { name: { en: "Silver", ar: "فضي", he: "כסף" }, color: "#E2E2E2" },
        {
          name: { en: "Midnight", ar: "منتصف الليل", he: "חצות" },
          color: "#1A1B1F",
        },
        {
          name: { en: "Starlight", ar: "ضوء النجوم", he: "אור כוכבים" },
          color: "#E3C6AA",
        },
      ],
      sizes: ["40mm", "44mm"],
    },
    // Mock product data
    {
      productId: "1",
      category: categories[0]._id, // Electronics category
      name: {
        en: "Apple Watch SE 2024",
        ar: "ساعة آبل SE 2024",
        he: "שעון אפל SE 2024",
      },
      images: ["https://ksp.co.il/shop/items/333502.jpg?v=5"],
    },
    {
      productId: "2",
      category: categories[0]._id, // Electronics category
      name: {
        en: "Samsung Galaxy Watch Ultra LTE",
        ar: "ساعة سامسونج جالاكسي ألترا LTE",
        he: "שעון סמסונג גלקסי אולטרה LTE",
      },
      images: ["https://ksp.co.il/shop/items/317594.jpg?v=5"],
    },
    {
      productId: "3",
      category: categories[0]._id, // Electronics category
      name: {
        en: "Apple Watch Ultra 2",
        ar: "ساعة آبل ألترا 2",
        he: "שעון אפל אולטרה 2",
      },
      images: ["https://ksp.co.il/shop/items/333307.jpg?v=5"],
    },
    {
      productId: "4",
      category: categories[0]._id, // Electronics category
      name: {
        en: "Apple Watch Series 10 GPS",
        ar: "ساعة آبل سيريز 10 GPS",
        he: "שעון אפל סדרה 10 GPS",
      },
      images: ["https://ksp.co.il/shop/items/332672.jpg?v=5"],
    },
    {
      productId: "5",
      category: categories[0]._id, // Electronics category
      name: {
        en: "Samsung Galaxy Watch 7",
        ar: "ساعة سامسونج جالاكسي 7",
        he: "שעון סמסונג גלקסי 7",
      },
      images: ["https://ksp.co.il/shop/items/317734.jpg?v=5"],
    },
    {
      productId: "6",
      category: categories[0]._id, // Electronics category
      name: {
        en: "Samsung Galaxy Watch 6",
        ar: "ساعة سامسونج جالاكسي 6",
        he: "שעון סמסונג גלקסי 6",
      },
      images: ["https://ksp.co.il/shop/items/283147.jpg?v=5"],
    },
    {
      productId: "7",
      category: categories[0]._id, // Electronics category
      name: {
        en: "Samsung Galaxy Watch FE",
        ar: "ساعة سامسونج جالاكسي FE",
        he: "שעון סמסונג גלקסי FE",
      },
      images: ["https://ksp.co.il/shop/items/338261.jpg?v=5"],
    },
    {
      productId: "8",
      category: categories[0]._id, // Electronics category
      name: {
        en: "Garmin Fenix 7",
        ar: "جارمين فينيكس 7",
        he: "גרמין פניקס 7",
      },
      images: ["https://ksp.co.il/shop/items/186997.jpg?v=5"],
    },
  ];

  const savedProducts = await Product.insertMany(products);
  console.log("Products seeded:", savedProducts);
  return savedProducts;
};
