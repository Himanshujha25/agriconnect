import express from "express";
import multer from "multer";
import { addProduct } from "../controllers/productController.js";

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/add", upload.array("images", 5), addProduct);

export default router;
