import express, { Router } from "express";
import { Blog } from "../models/blogModel.js";
import Comment from "../models/commentModel.js";
import { User } from "../models/userModel.js";

const router = express.Router();
// const router = Router();

// Create a new comment
Router.post("/comments", async (req, res) => {
  const { content, authorId, blogId } = req.body;

  try {
    const user = await User.findById(authorId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    const comment = new Comment({
      content,
      author: authorId,
      blog: blogId,
    });

    const savedComment = await comment.save();

    // Add the comment to the blog's comments array
    blog.comments.push(savedComment._id);
    await blog.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all comments for a blog post
router.get("/blogs/:blogId/comments", async (req, res) => {
  const { blogId } = req.params;

  try {
    const comments = await Comment.find({ blog: blogId }).populate(
      "author",
      "name"
    );

    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
