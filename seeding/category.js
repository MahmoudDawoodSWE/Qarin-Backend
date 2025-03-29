import Category from "../models/category.js";

export const seedCategories = async () => {
  const categories = [
    {
      _id: "64f1a1c2e4b0f5a1d1c2a3b4", // Fixed ID
      name: { en: "Electronics", ar: "إلكترونيات", he: "אלקטרוניקה" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Latest gadgets available!",
        ar: "أحدث الأدوات المتاحة!",
        he: "הגאדג'טים האחרונים זמינים!",
      },
    },
    {
      _id: "64f1a1c2e4b0f5a1d1c2a3b5", // Fixed ID
      name: { en: "Furniture", ar: "أثاث", he: "רהיטים" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Comfort and style!",
        ar: "راحة وأناقة!",
        he: "נוחות וסטייל!",
      },
    },
    {
      name: { en: "Clothing", ar: "ملابس", he: "בגדים" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Trendy fashion!",
        ar: "موضة عصرية!",
        he: "אופנה אופנתית!",
      },
    },
    {
      name: { en: "Books", ar: "كتب", he: "ספרים" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Explore new worlds through reading!",
        ar: "استكشف عوالم جديدة من خلال القراءة!",
        he: "גלה עולמות חדשים דרך קריאה!",
      },
    },
    {
      name: { en: "Toys", ar: "ألعاب", he: "צעצועים" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Fun and excitement for all ages!",
        ar: "متعة وإثارة لجميع الأعمار!",
        he: "כיף והתרגשות לכל גיל!",
      },
    },
    {
      name: { en: "Sports", ar: "رياضة", he: "ספורט" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Gear up for your next adventure!",
        ar: "استعد لمغامرتك القادمة!",
        he: "היכון להרפתקה הבאה שלך!",
      },
    },
    {
      name: { en: "Beauty", ar: "جمال", he: "יופי" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Enhance your natural beauty!",
        ar: "تعزيز جمالك الطبيعي!",
        he: "שפרי את היופי הטבעי שלך!",
      },
    },
    {
      name: { en: "Food & Drink", ar: "طعام وشراب", he: "אוכל ושתייה" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Delicious treats await!",
        ar: "مأكولات لذيذة في انتظارك!",
        he: "תענוגות טעימים מחכים לך!",
      },
    },
    {
      name: { en: "Health", ar: "صحة", he: "בריאות" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Stay fit and healthy!",
        ar: "ابقَ لائقًا وصحيًا!",
        he: "שמור על כושר ובריאות!",
      },
    },
    {
      name: { en: "Automotive", ar: "سيارات", he: "רכב" },
      picture:
        "https://img.abercrombie.com/is/image/anf/KIC_144-5090-00293-251_prod1?policy=product-medium",
      level: 1,
      advertisementSentence: {
        en: "Drive with confidence!",
        ar: "قد بثقة!",
        he: "נהג בביטחון!",
      },
    },
  ];

  const savedCategories = await Category.insertMany(categories);
  console.log("Categories seeded:", savedCategories);
  return savedCategories;
};
