import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, unit, stock, category, tags } = req.body;

    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const newProduct = new Product({
      name,
      description,
      price,
      unit,
      stock,
      category,
      tags,
      images,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};
