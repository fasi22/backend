const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Secret for JWT (store in .env in production)
const JWT_SECRET = "your_jwt_secret_key";

// REGISTER
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    res.status(201).json({ user: { _id: user._id, email: user.email } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ user: { _id: user._id, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL USERS (protected)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, __v: 0 });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
