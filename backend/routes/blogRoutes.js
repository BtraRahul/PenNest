import express from "express";
import { Blog } from "../models/blogModel.js";
import multer from "multer";
// import { authenticate } from "../controllers/authController.js";
import { searchBlogs } from "../controllers/blogController.js";
import {
  addComment,
  getComments,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

//search blogs
// router.get("/search", async (req, res) => {
//   try {
//     const blogs = await searchBlogs(req.query);
//     return res.status(200).json({
//       count: blogs.length,
//       data: blogs,
//     });
//   } catch (err) {
//     console.log(err.message);
//     return res.status(404).send({ message: "No blogs found" });
//   }
// });

//search blogs
router.get("/search", searchBlogs);

// Protected route for creating a new blog
// router.post("/", authenticate, async (req, res) => {
//   try {
//     if (!req.body.title || !req.body.author || !req.body.description) {
//       return res.status(400).send({ message: "Please enter all fields." });
//     }

//     const newBlog = new Blog({
//       title: req.body.title,
//       description: req.body.description,
//       author: req.body.author,
//     });

//     const blog = await Blog.create(newBlog);
//     return res.status(201).send(blog);
//   } catch (err) {
//     console.log(err.message);
//     return res.status(404).send({ message: "Complete all fields" });
//   }
// });

//creating without a image
// route for creating new blog
// router.post("/", async (req, res) => {
//   try {
//     if (!req.body.title || !req.body.author || !req.body.description) {
//       return res.status(400).send({ message: "Please enter all fields." });
//     }

//     const newBlog = new Blog({
//       title: req.body.title,
//       description: req.body.description,
//       author: req.body.author,
//       category: req.body.category,
//       // coverImage: req.body.coverImage,
//       coverImageUrl: req.body.coverImageUrl,
//       // dateUpdated: Date.now(),
//       //
//       //   datePublished: Date.now(),
//     });

//     const blog = await Blog.create(newBlog);
//     return res.status(201).send(blog);
//   } catch (err) {
//     console.log(err.message);
//     return res.status(404).send({ message: "Complete all fields" });
//   }
// });

//get all blogs (home page)
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json({
      count: blogs.length,
      data: blogs,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(404).send({ message: "No blogs found" });
  }
});

//get post by id
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    return res.status(200).send(blog);
  } catch (err) {
    console.log(err.message);
    return res.status(404).send({ message: "Blog not found" });
  }
});

//getting by author / profile page
router.get("/author/:author", async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.params.author });
    return res.status(200).json({
      count: blogs.length,
      data: blogs,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(404).send({ message: "No blogs found" });
  }
});

//get posts by category
router.get("/category/:category", async (req, res) => {
  try {
    const blogs = await Blog.find({ category: req.params.category });
    return res.status(200).json({
      count: blogs.length,
      data: blogs,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(404).send({ message: "No blogs found" });
  }
});

// updating a blog by author, search by id
router.put("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    blog.title = req.body.title;
    blog.description = req.body.description;
    blog.author = req.body.author;
    blog.dateUpdated = Date.now();
    //update category, default is empty
    blog.category = req.body.category ? req.body.category : "";

    const updatedBlog = await blog.save();
    return res.status(200).send(updatedBlog);
  } catch (err) {
    console.log(err.message);
    return res.status(404).send({ message: "Blog not found" });
  }
});

//delete blogs by id
router.delete("/:id", async (req, res) => {
  try {
    const result = await Blog.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send({ message: "Blog not found" });
    }
    return res.status(200).send({ message: "Blog deleted successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(404).send({ message: "Blog not found" });
  }
});

//like a blog
router.put("/:id/like", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    blog.likes = blog.likes + 1;
    const updatedBlog = await blog.save();
    return res.status(200).send(updatedBlog);
  } catch (err) {
    console.log(err.message);
    return res.status(404).send({ message: "Blog not found" });
  }
});

//unlike a blog
router.put("/:id/unlike", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    blog.likes = blog.likes - 1;
    const updatedBlog = await blog.save();
    return res.status(200).send(updatedBlog);
  } catch (err) {
    console.log(err.message);
    return res.status(404).send({ message: "Blog not found" });
  }
});

//comment on a blog

router.post("/:id/comments", addComment);
router.get("/:id/comments", getComments);
router.delete("/:id/comments/:commentId", deleteComment);

//uploading a file
// const upload = multer({ dest: "uploads/" });

// router.post("/upload", upload.single("coverImage"), async (req, res) => {
//   try {
//     const { title, author, description, category } = req.body;
//     const coverImageUrl = req.file ? `/uploads/${req.file.filename}` : null;

//     const blog = new Blog({
//       title,
//       author,
//       description,
//       category,
//       coverImageUrl,
//     });
//     await blog.save();
//     res.status(201).json({ blog, file: req.file });
//   } catch (err) {
//     console.log(err.message);
//     return res.status(404).send({ message: "No blogs found" });
//   }
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

//creating a blog alpng with image
router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, author, description, category } = req.body;
  const coverImageUrl = req.file ? req.file.path : null;

  try {
    const newBlog = new Blog({
      title,
      author,
      description,
      category,
      coverImageUrl,
    });
    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", data: newBlog });
  } catch (error) {
    res.status(400).json({ message: "Failed to create blog", error });
  }
});

export default router;
