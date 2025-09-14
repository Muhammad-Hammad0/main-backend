// controllers/productController.js (or wherever your addProduct lives)
import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";

export const addProduct = async (req, res) => {
  try {
    let { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Parse sizes if sent as JSON string
    let sizesArr = [];
    try {
      sizesArr = Array.isArray(sizes) ? sizes : JSON.parse(sizes || "[]");
    } catch (err) {
      sizesArr = [];
    }

    // Parse sizeChart (expect JSON string or array)
    let sizeChart = [];
    try {
      sizeChart = Array.isArray(req.body.sizeChart) ? req.body.sizeChart : JSON.parse(req.body.sizeChart || "[]");
    } catch (err) {
      sizeChart = [];
    }

    // Upload images to Cloudinary (robust: take secure_url or returned string)
    const handleUpload = async (file) => {
      if (!file) return "";
      const result = await uploadOnCloudinary(file.path);
      // uploadOnCloudinary might return an object or string
      return result?.secure_url || result?.url || result;
    };

    const image1 = await handleUpload(req.files?.image1?.[0]);
    const image2 = await handleUpload(req.files?.image2?.[0]);
    const image3 = await handleUpload(req.files?.image3?.[0]);
    const image4 = await handleUpload(req.files?.image4?.[0]);

    const productData = {
      name,
      description,
      price,
      category,
      subCategory,
      sizes: sizesArr,
      sizeChart: sizeChart,
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
      image1,
      image2,
      image3,
      image4
    };

    const product = await Product.create(productData);
    return res.status(201).json(product);
  } catch (error) {
    console.error("AddProduct error", error);
    return res.status(500).json({ message: "AddProduct error", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // If sizes or sizeChart are JSON strings, parse them
    if (updates.sizes && typeof updates.sizes === "string") {
      try { updates.sizes = JSON.parse(updates.sizes); } catch (e) { /* ignore */ }
    }
    if (updates.sizeChart && typeof updates.sizeChart === "string") {
      try { updates.sizeChart = JSON.parse(updates.sizeChart); } catch (e) { /* ignore */ }
    }

    // If new images are uploaded, replace fields (optional)
    const handleUpload = async (file) => {
      if (!file) return null;
      const result = await uploadOnCloudinary(file.path);
      return result?.secure_url || result?.url || result;
    };

    if (req.files) {
      const i1 = await handleUpload(req.files.image1?.[0]);
      const i2 = await handleUpload(req.files.image2?.[0]);
      const i3 = await handleUpload(req.files.image3?.[0]);
      const i4 = await handleUpload(req.files.image4?.[0]);
      if (i1) updates.image1 = i1;
      if (i2) updates.image2 = i2;
      if (i3) updates.image3 = i3;
      if (i4) updates.image4 = i4;
    }

    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    return res.status(200).json(product);
  } catch (error) {
    console.error("UpdateProduct error", error);
    return res.status(500).json({ message: "UpdateProduct error", error: error.message });
  }
};

export const listProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    console.error("ListProduct error", error);
    return res.status(500).json({ message: "ListProduct error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    console.error("GetProduct error", error);
    return res.status(500).json({ message: "GetProduct error" });
  }
};

export const removeProduct = async (req, res) => {
  try {
    let { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    return res.status(200).json(product);
  } catch (error) {
    console.error("RemoveProduct error", error);
    return res.status(500).json({ message: "RemoveProduct error" });
  }
};
