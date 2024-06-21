import express from "express";
import {
  register,
  login,
  authenticate,
  logout,
} from "../controllers/authController.js";
import multer from "multer";

const router = express.Router();

// using multr to upload profile pick along with register userdata
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profiles");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Register user
router.post("/register", upload.single("profilePic"), register);

// Login user
router.post("/login", login);

// Logout user (for demonstration, but token removal is client-side)
router.post("/logout", logout);

// Protected route example
router.get("/protected", authenticate, (req, res) => {
  res.status(200).json({ message: "You are authorized" });
});

export default router;
