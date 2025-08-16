import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  unit: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [String],
  images: [String], // store image URLs or base64 if not using cloud storage
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
