import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const register = async (req, res) => {
  try {
    console.log(process.env.JWT_SECRET);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const profilePicUrl = req.file ? req.file.path : null;

    const user = new User({ name, email, password, profilePicUrl });
    await user.save();

    const token = generateToken(user);
    res.cookie("token", token).json({ token, user });

    // res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    //sending token as cookie to store and save it in browser
    res.cookie("token", token).json({ token, user });
    // res.status(200).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const authenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { maxAge: 1 }).json({ message: "Logged out" });
  // res.status(200).json({ message: "Logged out successfully" });
};
