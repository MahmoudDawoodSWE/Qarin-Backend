import mongoose from "mongoose";

const translationSchema = new mongoose.Schema({
  en: {
    type: String,
    required: true,
  },
  ar: {
    type: String,
    required: true,
  },
  he: {
    type: String,
    required: true,
  },
});

export default translationSchema;
