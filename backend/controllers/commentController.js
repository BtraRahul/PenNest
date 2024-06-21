import { Blog } from "../models/blogModel.js";

export const addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const newComment = {
      author: req.body.author,
      text: req.body.text,
    };

    blog.comments.push(newComment);
    await blog.save();

    res.status(201).json(blog.comments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const comment = blog.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.text = req.body.text || comment.text;
    await blog.save();

    res.status(200).json(blog.comments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getComments = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog.comments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//delete commment by id
export const deleteComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const comment = blog.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.remove();
    console.log(comment);
    await blog.save();

    res.status(200).json(blog.comments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
