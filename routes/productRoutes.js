import express from "express";
import multer from "multer";
import { addProduct, listProduct, removeProduct } from "../controller/productController.js";
import adminAuth from "../middleware/adminAuth.js";

let productRoutes = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to save images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Routes
productRoutes.post(
  "/addproduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 4 } // I fixed "image1" repeated here
  ]),
  addProduct
);

productRoutes.get("/list" , listProduct)
productRoutes.post("/remove/:id" ,adminAuth, removeProduct)

export default productRoutes;
