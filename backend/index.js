import dotenv from "dotenv";
dotenv.config();

import express from "express";
// import { PORT, mongoDbURL } from "./config.js";
import router from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import cors from "cors";
import mongoose from "mongoose";
// import commentRoutes from "./routes/commentRoutes.js";

const port = process.env.SERVER_PORT;
const mongoDbURL = process.env.mongoDbURL;
const API_BASE_URL = process.env.API_BASE_URL;
const CLIENT_URL = process.env.CLIENT_URL;
const app = express();

//option 1: allow all origins with default of cors(*)

// app.use(
//   cors({
//     origin: ["localhost:5555", "localhost:5173"],
//     credentials: true,
//   })
// );
// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   // if (allowedOrigins.includes(origin)) {
//   res.setHeader("Access-Control-Allow-Origin", origin);
//   // }
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

app.use(
  cors({
    credentials: true,
    origin: [
      "*",
      "http://localhost:5173",
      "http://localhost:5555",
      "https://pen-nest.vercel.app/",
      "https://pen-nest.vercel.app/",
      API_BASE_URL,
      CLIENT_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/blogs", router);
app.use("/blogs/auth", authRoutes);

import path from "path";
import { fileURLToPath } from "url"; // Import url for __dirname equivalent

// Get the __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware to serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use("/blogs", commentRoutes);

app.get("/", (req, res) => {
  return res.status(234).send("HELLO WORLD!");
});

mongoose
  .connect(mongoDbURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Server is running on port 5555");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
