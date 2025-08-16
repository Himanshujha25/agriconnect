// controllers/AuthController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Signup
export const signup = async (req, res) => {
  try {
    const { fullName, email, password, userType } = req.body;

    if (!fullName || !email || !password || !userType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      userType // "buyer" or "seller"
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully", userType: user.userType });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Signin
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      userType: user.userType,
      fullName: user.fullName,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
