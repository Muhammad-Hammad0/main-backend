// model/productModel.js
import mongoose from "mongoose";

const sizeChartRow = new mongoose.Schema({
  size: { type: String, required: true },
  chest: { type: String, default: "" },
  length: { type: String, default: "" },
  waist: { type: String, default: "" },
  sleeves: { type: String, default: "" }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  image3: { type: String, required: true },
  image4: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: [String], required: true },
  sizeChart: { type: [sizeChartRow], default: [] }, // <-- NEW
  date: { type: Number },
  bestseller: { type: Boolean }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
